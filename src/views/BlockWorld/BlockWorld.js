import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './block-world.css'
import SetupWorld from '../SetupWorld'
import Module from '../../interface/Module'
import TreeGraph from '../../interface/TreeGraph'
import WorldSolver from '../../logic/WorldSolver'

class BlockWorld extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    width: 2,
    height: 2
  }

  constructor() {
    super()

    this.state = {
      startFacts: null,
      targetFacts: null,
      decisions: {name:''},
      steps: 'None'
    }

    this.go = this.go.bind(this)
  }

  render() {
    const { startFacts, targetFacts, decisions, steps } = this.state

    return (
      <div className="block-world">
        <Module title="Start World">
          <SetupWorld
            onUpdate={facts => this.setState({startFacts: facts})}
            width={this.props.width}
            height={this.props.height}
          />
          <p>World Facts:</p>
          {startFacts && startFacts.getSortedFacts().map((fact, i) =>
            <p key={i+fact.toString()}>
              {fact.toString()}
            </p>
          )}
        </Module>
        <Module title="Target World">
          <SetupWorld
            onUpdate={facts => this.setState({targetFacts: facts})}
            width={this.props.width}
            height={this.props.height}
          />
          <p>World Facts:</p>
          {targetFacts && targetFacts.getSortedFacts().map((fact, i) =>
            <p key={i+fact.toString()}>
              {fact.toString()}
            </p>
          )}
        </Module>
        <button onClick={this.go} className="module" style={{fontSize: '24px'}}>Go</button>
        <Module title="Decision Tree">
          <p>
            Solution: {steps}
          </p>
          <TreeGraph
            tree={decisions}
          />
        </Module>
      </div>
    )
  }

  /**
   * Do something amazing, please
   */
  go() {
    const { startFacts, targetFacts } = this.state

    if (!startFacts || !targetFacts) {
      return null
    }

    // This line will call the WorldSolver class with the facts
    const steps = WorldSolver.solve(startFacts, targetFacts)
      .map(step => step.toString().replace(',', ' '))
      .toString().replace(',', ' ; ')

    const tree = {
      name: '',
      children: startFacts ? startFacts.toArray().map((fact, i) => {return {name: i+')'+fact}}) : []
    }

    this.setState({
      decisions: tree,
      steps: steps
    })
  }
}

export default BlockWorld
