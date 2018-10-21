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
   * Generate the world facts given world state
   * @param      {string}  hooked   The hooked block
   * @param      {array}   stacked  The 2D array of hooked blocks
   */
  constructor(hooked, stacked) {
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

    this.facts = facts
  }

  /**
   * Returns an array representation of the facts.
   */
  toArray() {
    return this.facts.map(
      factSet => factSet.reduce(
        (fact, factPiece) => fact+' '+factPiece
      , '')
    ).sort()
  }
}

export default WorldFacts
export { HOOKED, NOTHING_HOOKED, ON_PLATFORM, NOTHING_ABOVE, BLOCK_ABOVE, SPACE_ON_PLATFORM }
