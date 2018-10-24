import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './block-world.css'
import SetupWorld from '../SetupWorld'
import Module from '../../interface/Module'
import Arrow from '../../interface/Arrow'
import TreeGraph from '../../interface/TreeGraph'
import WorldSolver from '../../logic/WorldSolver'

const NO_DECISIONS = () => ({name:'', children: []})

class BlockWorld extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    width: 4,
    height: 4
  }

  constructor() {
    super()

    this.state = {
      lastError: null,
      startFacts: null,
      targetFacts: null,
      startBlockCheck: null,
      targetBlockCheck: null,
      solving: false,
      decisions: NO_DECISIONS(),
      steps: null
    }

    this.onSolveClick = this.onSolveClick.bind(this)
  }

  render() {
    const { decisions, steps, startBlockCheck, targetBlockCheck, lastError, solving } = this.state

    return (
      <div className="block-world">
        {lastError &&
          <Module title="Something went wrong">
            <p>
              {lastError}
            </p>
            <p>
              <em>Note: 90% of errors are user error</em>
            </p>
          </Module>
        }
        <Module title="Start World">
          <SetupWorld
            onUpdate={(facts, blockCheck) => this.setState({startFacts: facts, 'startBlockCheck': blockCheck})}
            width={this.props.width}
            height={this.props.height}
          />
        </Module>
        <Arrow
          onClick={
            startBlockCheck !== null && startBlockCheck === targetBlockCheck && !solving
              ? this.onSolveClick
              : null
          }
        />
        <Module title="Target World">
          <SetupWorld
            onUpdate={(facts, blockCheck) => this.setState({targetFacts: facts, 'targetBlockCheck': blockCheck})}
            width={this.props.width}
            height={this.props.height}
          />
        </Module>
        <Module title="Decision Tree">
          <p>
            Solution: {steps || '-'}
          </p>
          <TreeGraph
            tree={decisions}
          />
        </Module>
      </div>
    )
  }

  /**
   * On the solve button being clicked.
   */
  onSolveClick() {
    const { startFacts, targetFacts, startBlockCheck, targetBlockCheck } = this.state

    if (
      // Worlds have not been initialised
      (!startFacts || !targetFacts)
      // Worlds do not have matching blocks
      || (startBlockCheck === null || startBlockCheck !== targetBlockCheck)
    ) {
      return null
    }

    // Solve world, save errors
    let solveError = null, steps = null, tree = NO_DECISIONS()
    try {
      steps = WorldSolver.solve(startFacts.clone(), targetFacts.clone(), tree)
        .map(step => step.toString().replace(',', ' '))
        .toString().replace(',', ' ; ')
    } catch (error) {
      solveError = error.toString()
    }

    this.setState({
      lastError: solveError,
      solving: false,
      steps: steps,
      decisions: tree
    })
  }
}

export default BlockWorld
