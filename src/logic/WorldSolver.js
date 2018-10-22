import WorldFacts, { HOOKED, NOTHING_HOOKED, ON_PLATFORM, NOTHING_ABOVE, BLOCK_ABOVE, SPACE_ON_PLATFORM } from './WorldFacts'

// Action labels
// TODO: Determine if these constants are necessary (likely not)
const PUT_ON_BLOCK = 'put'
const PUT_ON_PLATFORM = 'put on table'
const PICK_UP = 'pick up'

// TODO: remove after confident it wont make infinite checks
const MAX_CHECKS = 1
const MAX_DEPTH = 5

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
    let numChecks = 0
    if (depth >= MAX_DEPTH) {
      console.error('!!! Unexpected level of recursion!')
      return steps
    }

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
              console.log('@@@ CHECKING: not ON_PLATFORM(x) -> so PUT_ON_PLATFORM(x)', 'x='+fact[1])
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnPlatform(fact[1]),
                steps,
                depth + 1
              )
              console.log('@@@ RUNNING: not ON_PLATFORM(x) -> so PUT_ON_PLATFORM(x)', 'x='+fact[1])
              current.putOnPlatform(fact[1])
              steps.push([PUT_ON_PLATFORM, fact[1]])
              break

            case HOOKED:
              console.log('@@@ CHECKING: not HOOKED(x) -> so PICK_UP(x)', 'x='+fact[1])
              steps = this.solve(
                current,
                WorldFacts.reqForPickUp(fact[1]),
                steps,
                depth + 1
              )
              console.log('@@@ RUNNING: not HOOKED(x) -> so PICK_UP(x)', 'x='+fact[1])
              current.pickUp(fact[1])
              steps.push([PICK_UP, fact[1]])
              break

            case NOTHING_HOOKED:
              // TODO: remove duplicate with ON_PLATFORM(x)
              const hooked = current.findHookedBlock()
              console.log('@@@ CHECKING: not NOTHING_HOOKED() -> so PUT_ON_PLATFORM( findHooked() )', 'findHooked()='+hooked)
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnPlatform(hooked),
                steps,
                depth + 1
              )
              console.log('@@@ RUNNING: not NOTHING_HOOKED() -> so PUT_ON_PLATFORM( findHooked() )', 'findHooked()='+hooked)
              current.putOnPlatform(hooked)
              steps.push([PUT_ON_PLATFORM, hooked])
              break

            case BLOCK_ABOVE:
              console.log('@@@ CHECKING: not BLOCK_ABOVE(x, y) -> so PUT_ON_BLOCK(x, y)', 'x='+fact[1], 'y='+fact[2])
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnBlock(fact[1], fact[2]),
                steps,
                depth + 1
              )
              console.log('@@@ RUNNING: not BLOCK_ABOVE(x, y) -> so PUT_ON_BLOCK(x, y)', 'x='+fact[1], 'y='+fact[2])
              current.putOnBlock(fact[1], fact[2])
              steps.push([PUT_ON_BLOCK, fact[1], fact[2]])
              break

            case NOTHING_ABOVE:
              const blockAbove = current.findBlockAbove(fact[1])
              console.log('@@@ CHECKING: not NOTHING_ABOVE(x) -> so PICK_UP( findAbove(x) )', 'x='+fact[1], 'findAbove(x)='+blockAbove)
              steps = this.solve(
                current,
                WorldFacts.reqForPickUp(blockAbove),
                steps,
                depth + 1
              )
              console.log('@@@ RUNNING: not NOTHING_ABOVE(x) -> so PICK_UP( findAbove(x) )', 'x='+fact[1], 'findAbove(x)='+blockAbove)
              current.pickUp(blockAbove)
              steps.push([PICK_UP, blockAbove])
              break

            case ON_PLATFORM:
              console.log('@@@ CHECKING: not ON_PLATFORM(x) -> so PUT_ON_PLATFORM(x)', 'x='+fact[1])
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnPlatform(fact[1]),
                steps,
                depth + 1
              )
              console.log('@@@ RUNNING: not ON_PLATFORM(x) -> so PUT_ON_PLATFORM(x)', 'x='+fact[1])
              current.putOnPlatform(fact[1])
              steps.push([PUT_ON_PLATFORM, fact[1]])
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
