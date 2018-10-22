import WorldFacts, { HOOKED, NOTHING_HOOKED, ON_PLATFORM, NOTHING_ABOVE, BLOCK_ABOVE, SPACE_ON_PLATFORM } from './WorldFacts'

// Action labels
// TODO: Determine if these constants are necessary (likely not)
const PUT = 'put'
const PUT_ON_TABLE = 'put on table'
const PICK_UP = 'pick up'

// TODO: remove after confident it wont make infinite checks
let numChecks = 0
const MAX_CHECKS = 2

/**
 * Class for storing block facts
 * @class      WorldSolver
 */
class WorldSolver {
  /**
   * Generate a set of steps to achieve the target world
   * @param      {WorldFacts}  current  The current world facts
   * @param      {WorldFacts}  target   The target world facts
   * @param      {Array}       steps    The steps taken so far
   * @param      {Array}       depth    The depth of this recursive call
   * @return     {Array}  The steps to achieve the target world
   */
  static solve(current, target, steps=[], depth=0) {
    console.log('===========================================', depth)
    if (depth === 3) return steps

    console.log('current:', current.toArray())
    console.log('target:', target.toArray())

    let allPassed = false
    do {
      const facts = target.getSortedFacts()
      console.log('sortedFacts:', facts, current.getSortedFacts())
      allPassed = facts.every(fact => {
        console.log('---', fact)

        // If the current world does not contain the fact
        if (!current.hasFact(fact)) {
          console.log('###', fact)

          // Find the action which will make this fact true
          switch(fact[0]) {
            case ON_PLATFORM:
              console.log('@@@ ON_PLATFORM(x) -> PUT_ON_TABLE(x)')

              // Find steps to be able to perform this fix
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnPlatform(fact[1]),
                steps,
                depth + 1
              )

              console.log('@@@ RUNNING:::: ON_PLATFORM(x) -> PUT_ON_TABLE(x)')
              // Apply this fix
              current.putOnPlatform(fact[1])

              // Save the steps taken
              steps.push([PUT, fact[1]])
              break
            case HOOKED:
              console.log('@@@ HOOKED(x) -> PICK_UP(x)')
              steps.push([PICK_UP, fact[1]])
              break
            default:
              console.error('@@@ This fact type is not fixable:', fact[0])
          }

          return false // Run through facts again because the current facts were modified
        }

        return true
      })

      // Prevent infinite loop crashing browser
      if (numChecks++ > MAX_CHECKS) {
        console.error('!!! Unexpected number of retries')
        return steps
      }
      if (!allPassed) {
        console.log('*** World modified, so performing checks again!')
      } else {
        console.log('*** World state passed!')
      }
    } while (!allPassed)

    console.log('===========================================', depth)
    return steps
  }
}

export default WorldSolver
