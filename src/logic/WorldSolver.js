import WorldFacts, { HOOKED, NOTHING_HOOKED, ON_PLATFORM, NOTHING_ABOVE, BLOCK_ABOVE, SPACE_ON_PLATFORM, PICK_UP, PUT_ON_PLATFORM, PUT_ON_BLOCK } from './WorldFacts'
import TreeGraph from '../interface/TreeGraph'

// Max recursion depth (to prevent crashing browser)
const MAX_CHECKS = 100
const MAX_DEPTH = 100

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
  static solve(current, target, tree={name:'intial',children:[]}, steps=[], depth=0) {
    
    // Prevent infinite looping browsers (to replace with loop detection later)
    if (depth >= MAX_DEPTH) {
      throw new Error('Unexpected level of recursion!')
    }

    let numChecks = 0, allPassed = false
    do {
      const facts = target.getSortedFacts()
      /* eslint-disable no-loop-func */
      allPassed = facts.every(fact => {
        // Append step to tree
        let child = TreeGraph.newTreeNode(WorldFacts.factToString(fact, false), [], 'g', numChecks)

        // If the current world does not contain the fact
        if (!current.hasFact(fact)) {

          // Find the action which will make this fact true
          switch(fact[0]) {
            case ON_PLATFORM:
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnPlatform(fact[1]),
                child,
                steps,
                depth + 1
              )
              current.putOnPlatform(fact[1])
              steps.push([PUT_ON_PLATFORM, fact[1]])
              break

            case HOOKED:
              steps = this.solve(
                current,
                WorldFacts.reqForPickUp(fact[1]),
                child,
                steps,
                depth + 1
              )
              current.pickUp(fact[1])
              steps.push([PICK_UP, fact[1]])
              break

            case NOTHING_HOOKED:
              // TODO: remove duplicate with ON_PLATFORM(x)
              const hooked = current.findHookedBlock()
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnPlatform(hooked),
                child,
                steps,
                depth + 1
              )
              current.putOnPlatform(hooked)
              steps.push([PUT_ON_PLATFORM, hooked])
              break

            case BLOCK_ABOVE:
              steps = this.solve(
                current,
                WorldFacts.reqForPutOnBlock(fact[1], fact[2]),
                child,
                steps,
                depth + 1
              )
              current.putOnBlock(fact[1], fact[2])
              steps.push([PUT_ON_BLOCK, fact[1], fact[2]])
              break

            case NOTHING_ABOVE:
              const blockAbove = current.findBlockAbove(fact[1])
              steps = this.solve(
                current,
                WorldFacts.reqForPickUp(blockAbove),
                child,
                steps,
                depth + 1
              )
              current.pickUp(blockAbove)
              steps.push([PICK_UP, blockAbove])
              break

            case SPACE_ON_PLATFORM:
              const random = current.findRandomBlock()
              steps = this.solve(
                current,
                WorldFacts.reqForPickUp(random),
                child,
                steps,
                depth + 1
              )
              current.pickUp(random)
              steps.push([PICK_UP, random, '(random choice)'])
              break

            default:
              throw new Error('Invalid fact type! fact[0]='+fact[0])
          }

          // Append missing fact node, with action required as child node
          tree.children.push(
            TreeGraph.newTreeNode(
              child.name,
              [ TreeGraph.newTreeNode(WorldFacts.factToString(steps[steps.length-1], false), child.children, 'b') ],
              'r'
            )
          )
          // Run through facts again because the current facts were modified
          return false
        }

        // Append matching fact
        tree.children.push(child)
        return true
      })

      // Prevent infinite looping browsers (to replace with loop detection later)
      if (numChecks++ > MAX_CHECKS) {
        throw new Error('Unexpected number of re-checks!')
      }
    } while (!allPassed)

    return steps
  }
}

export default WorldSolver
export { PUT_ON_PLATFORM, PUT_ON_BLOCK, PICK_UP }
