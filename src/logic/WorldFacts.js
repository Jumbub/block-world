const HOOKED = 'hooked'
const NOTHING_HOOKED = 'nothing hooked'
const ON_PLATFORM = 'on platform'
const NOTHING_ABOVE = 'nothing above'
const BLOCK_ABOVE = 'block above'
const SPACE_ON_PLATFORM = 'space on platform'

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
  static reqForPickup(block) {
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
   * Determine if this world contains the passed fact.
   * @param      {array}  fact    The fact
   */
  hasFact(fact) {
    console.log(fact)
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
   * Retrieve the facts sorted for optimal steps
   * @return     {array}  The 2D facts array
   */
  getSortedFacts() {
    return this.facts.sort((a, b) => {
      // Matches are currently always equal importance
      if (a[0] === b[0]) {
        return 0

      // Always first
      } else if (a[0] === BLOCK_ABOVE) {
        return -1

      // Always first
      } else if (a[0] === ON_PLATFORM && b[0] !== BLOCK_ABOVE) {
        return -1

      // Always last
      } else if (a[0] === SPACE_ON_PLATFORM) {
        return 1

      // TODO: Replace this catch all with an error when all cases have been filled
      } else {
        return 1
      }
    })
  }

  /**
   * Returns an array representation of the facts
   */
  toArray() {
    return this.facts.map(
      factSet => factSet.toString()
    ).sort()
  }

  /**
   * Returns an array representation of the facts
   */
  toString() {
    return this.toArray().reduce((string, fact) => string + '|' + fact)
  }
}

export default WorldFacts
export { HOOKED, NOTHING_HOOKED, ON_PLATFORM, NOTHING_ABOVE, BLOCK_ABOVE, SPACE_ON_PLATFORM }
