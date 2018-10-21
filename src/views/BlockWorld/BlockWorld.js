import React, { Component } from 'react'

import './block-world.css'
import TreeGraph from '../../interface/TreeGraph'
import SetupWorld from '../SetupWorld'
import Module from '../../interface/Module'

class BlockWorld extends Component {
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
          />
          <p>World Facts:</p>
          {startFacts && startFacts.toArray().map((fact, i) =>
            <p key={fact + i}>
              {fact}
            </p>
          )}
        </Module>
        <Module title="Target World">
          <SetupWorld
            onUpdate={facts => this.setState({targetFacts: facts})}
          />
          <p>World Facts:</p>
          {targetFacts && targetFacts.toArray().map(fact =>
            <p key={fact}>
              {fact}
            </p>
          )}
        </Module>
        <button onClick={this.go} className="module" style={{fontSize: '24px'}}>Go</button>
        <Module title="Decision Tree">
          <p>
            Steps to solve: {steps}
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
    const { startFacts } = this.state

    // This line will call the BlockSolver class with the facts
    const steps = 'None'

    const tree = {
      name: '',
      children: startFacts ? startFacts.toArray().map(fact => {return {name: fact}}) : []
    }

    this.setState({
      decisions: tree,
      steps: steps
    })
  }
}

export default BlockWorld
