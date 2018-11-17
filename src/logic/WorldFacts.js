// Fact labels
const HOOKED = 'hooked'
const NOTHING_HOOKED = 'nothing hooked'
const ON_PLATFORM = 'on platform'
const NOTHING_ABOVE = 'nothing above'
const BLOCK_ABOVE = 'block above'
const SPACE_ON_PLATFORM = 'space on platform'

// Action labels
const PUT_ON_BLOCK = 'put'
const PUT_ON_PLATFORM = 'put on platform'
const PICK_UP = 'pick up'

/**
 * Class for storing block facts
 * @class      WorldFacts
 */
class WorldFacts {
  /**
   * Construct a world facts instance
   * @param      {array}  facts  The world facts
   */
  constructor(facts) {
    this.facts = facts
  }

  /**
   * Generate the world facts given world state
   * @param      {string}  hooked   The hooked block
   * @param      {array}   stacked  The 2D array of hooked blocks
   */
  static createFromWorld(hooked, stacked) {
    let facts = []
    if (hooked !== null) {
      facts.push([HOOKED, hooked])
      facts.push([NOTHING_ABOVE, hooked])
    } else {
      facts.push([NOTHING_HOOKED])
    }

    stacked.forEach((row, columnIndex) => {
      row.forEach((block, rowIndex) => {
        if (rowIndex === 0) {
          facts.push([ON_PLATFORM, block])
        }
        if (rowIndex === row.length-1) {
          facts.push([NOTHING_ABOVE, block])
        } else {
          facts.push([BLOCK_ABOVE, row[rowIndex], row[rowIndex+1]])
        }
      })
      if (row.length === 0) {
        facts.push([SPACE_ON_PLATFORM])
      }
    })

    return new WorldFacts(facts)
  }

  /**
   * Generate the required facts to pick up a block
   * @param      {string}      block   The block
   * @return     {WorldFacts}  The required facts
   */
  static reqForPickUp(block) {
    return new WorldFacts([
      [NOTHING_ABOVE, block],
      [NOTHING_HOOKED]
    ])
  }

  /**
   * Generate the required facts to put the block on the platform
   * @param      {string}      block   The block
   * @return     {WorldFacts}  The required facts
   */
  static reqForPutOnPlatform(block) {
    return new WorldFacts([
      [HOOKED, block],
      [SPACE_ON_PLATFORM]
    ])
  }

  /**
   * Generate the required facts to put a block on top of another
   * @param      {string}      bottomBlock  The block below
   * @param      {string}      topBlock     The block above
   * @return     {WorldFacts}  The required facts
   */
  static reqForPutOnBlock(bottomBlock, topBlock) {
    return new WorldFacts([
      [NOTHING_ABOVE, bottomBlock],
      [HOOKED, topBlock]
    ])
  }

  /**
   * Modify facts for the action of picking up a block
   * @param      {string}  block   The block
   */
  pickUp(block) {
    const nothingHookedIndex = this.facts.findIndex(fact => fact[0] === NOTHING_HOOKED)
    this.facts.splice(nothingHookedIndex, 1)

    this.facts.push([HOOKED, block])

    if (this.facts.find(fact => fact[0] === ON_PLATFORM && fact[1] === block)) {
      // On platform
      const onPlatformIndex = this.facts.findIndex(fact => fact[0] === ON_PLATFORM && fact[1] === block)
      this.facts.splice(onPlatformIndex, 1)

      this.facts.push([SPACE_ON_PLATFORM])
    } else {
      // On another block
      const blockBelow = this.findBlockBelow(block)

      const blockAboveIndex = this.facts.findIndex(fact => fact[0] === BLOCK_ABOVE && fact[2] === block)
      this.facts.splice(blockAboveIndex, 1)

      this.facts.push([NOTHING_ABOVE, blockBelow])
    }
  }

  /**
   * Modify facts for the action of putting a block on the platform
   * @param      {string}  block   The block
   */
  putOnPlatform(block) {
    const hookedIndex = this.facts.findIndex(fact => fact[0] === HOOKED && fact[1] === block)
    this.facts.splice(hookedIndex, 1)
    const spaceIndex = this.facts.findIndex(fact => fact[0] === SPACE_ON_PLATFORM)
    this.facts.splice(spaceIndex, 1)

    this.facts.push([NOTHING_HOOKED])
    this.facts.push([ON_PLATFORM, block])
    this.facts.push([NOTHING_ABOVE, block])
  }

  /**
   * Modify facts for the action of putting a block on top of another
   * @param      {string}  bottomBlock  The block below
   * @param      {string}  topBlock     The block above
   */
  putOnBlock(bottomBlock, topBlock) {
    const hookedIndex = this.facts.findIndex(fact => fact[0] === HOOKED && fact[1] === topBlock)
    this.facts.splice(hookedIndex, 1)
    const nothingAboveIndex = this.facts.findIndex(fact => fact[0] === NOTHING_ABOVE && fact[1] === bottomBlock)
    this.facts.splice(nothingAboveIndex, 1)

    this.facts.push([NOTHING_HOOKED])
    this.facts.push([BLOCK_ABOVE, bottomBlock, topBlock])
    this.facts.push([NOTHING_ABOVE, topBlock])
  }

  /**
   * Find the block which is hooked
   * @return     {string}  The hooked block
   */
  findHookedBlock() {
    const hooked = this.facts.find(
      fact => fact[0] === HOOKED
    )
    // TODO: replace after confident
    if (!hooked || hooked.length < 2) {
      console.error('findBlockHooked failed! [1]', hooked, this.facts)
      throw new Error('findBlockHooked failed! [1] hooked='+hooked)
    }
    return hooked[1]
  }

  /**
   * Find a random block
   * @return     {string}  The hooked block
   */
  findRandomBlock() {
    // Shuffle facts
    const shuffled = this.facts
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    for (var i = 0; i < shuffled.length; i++) {
      if (shuffled[i][2]) {
        return shuffled[i][2]
      } else if (shuffled[i][1]) {
        return shuffled[i][1]
      }
    }
    throw new Error('Cannot retrieve random block, because there are no blocks!')
  }

  /**
   * Find the block above this block
   * @param      {string}  block   The block
   * @return     {string}  The block above
   */
  findBlockAbove(block) {
    // TODO: replace after confident
    if (!block) {
      console.error('findBlockAbove failed! [1]', block)
      throw new Error('findBlockAbove failed! [1] block='+block)
    }
    const above = this.facts.find(
      fact => fact[0] === BLOCK_ABOVE && fact[1] === block
    )
    // TODO: replace after confident
    if (!above || above.length < 3) {
      throw new Error('findBlockAbove failed! [1] block='+block)
    }
    return above[2]
  }

  /**
   * Find the block below this block
   * @param      {string}  block   The block
   * @return     {string}  The block below
   */
  findBlockBelow(block) {
    // TODO: replace after confident
    if (!block) {
      throw new Error('findBlockBelow failed! [1] block='+block)
    }
    const below = this.facts.find(
      fact => fact[0] === BLOCK_ABOVE && fact[2] === block
    )
    // TODO: replace after confident
    if (!below || below.length < 3) {
      throw new Error('findBlockBelow failed! [1] block='+block)
    }
    return below[1]
  }

  /**
   * Determine if this world contains the passed fact.
   * @param      {array}  fact    The fact
   */
  hasFact(fact) {
    return this.facts.find(
      myFact => fact.toString() === myFact.toString()
    )
  }

  /**
   * Gets the 2D fact array
   * @return     {array}  The 2D facts array
   */
  getFacts() {
    return this.facts
  }

  /**
   * Get the fact priority (used for sorting)
   *
   * @param      {array}  fact    The fact
   */
  static factPriority(fact) {
    // TODO: fix these priorities and potentially remove code which will never be hit due to the ordering
    switch(fact[0]) {
      case BLOCK_ABOVE:
        return 5
      case ON_PLATFORM:
        return 4
      case NOTHING_ABOVE:
        return 3
      case NOTHING_HOOKED:
        return 2
      case HOOKED:
        return 1
      case SPACE_ON_PLATFORM:
        return 0
      default:
        throw new Error('Invalid fact! fact='+fact)
    }
  }

  /**
   * Retrieve the facts sorted for optimal steps
   * @return     {array}  The 2D facts array
   */
  getSortedFacts() {
    return this.facts.sort((a, b) => WorldFacts.factPriority(b) - WorldFacts.factPriority(a))
  }

  /**
   * Returns an array representation of the facts
   */
  getFactArray() {
    return this.facts.map(
      fact => WorldFacts.factToString(fact)
    ).sort()
  }

  /**
   * Creates a new instance of the object with same properties than original.
   * @return     {WorldFacts}  Copy of this object.
   */
  clone() {
    return new WorldFacts(this.facts.slice())
  }

  /**
   * Return the stringified version of the fact array
   *
   * @param      {array}   fact     The fact
   * @param      {bool}    verbose  Verbose explanation
   * @return     {string}  fact     The stringified explanation
   */
  static factToString(fact, verbose=true) {
    if (fact[0] === PUT_ON_PLATFORM) {
      return verbose
        ? 'Put the ' + fact[1] + ' block on the platform'
        : 'put ' + fact[1] + ' on platform'
    } else if (fact[0] === PUT_ON_BLOCK) {
      return verbose
        ? 'Put the ' + fact[2] + ' block on the ' + fact[1] + ' block'
        : 'put ' + fact[2] + ' on ' + fact[1]
    } else if (fact[0] === PICK_UP) {
      return verbose
        ? 'Pick up the ' + fact[1] + ' block'
        : 'pick up ' + fact[1]
    } else if (fact[0] === HOOKED) {
      return verbose
        ? 'The ' + fact[1] + ' block is hooked'
        : fact[1] + ' hooked'
    } else if (fact[0] === NOTHING_HOOKED) {
      return verbose
        ? 'There are no hooked blocks'
        : 'nothing hooked'
    } else if (fact[0] === ON_PLATFORM) {
      return verbose
        ? 'The ' + fact[1] + ' block is on the platform'
        : fact[1] + ' on platform'
    } else if (fact[0] === NOTHING_ABOVE) {
      return verbose
        ? 'There are no blocks above the ' + fact[1] + ' block'
        : 'nothing above ' + fact[1] + ' block'
    } else if (fact[0] === BLOCK_ABOVE) {
      return verbose
        ? 'The ' + fact[2] + ' block is above the ' + fact[1] + ' block'
        : fact[2] + ' block above ' + fact[1]
    } else if (fact[0] === SPACE_ON_PLATFORM) {
      return verbose
        ? 'There is a space on the platform'
        : 'space on platform'
    }
  }
}

export default WorldFacts
export { HOOKED, NOTHING_HOOKED, ON_PLATFORM, NOTHING_ABOVE, BLOCK_ABOVE, SPACE_ON_PLATFORM, PUT_ON_BLOCK, PUT_ON_PLATFORM, PICK_UP }
