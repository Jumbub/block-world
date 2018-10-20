import React, { Component } from 'react'

import './block-world.css'
import DecisionTree from '../DecisionTree'
import SetupWorld from '../SetupWorld'
import Module from '../../interface/Module'
import Arrow from '../../interface/Arrow'

class BlockWorld extends Component {

  constructor() {
    super()

    this.state = {
      startFacts: [],
      targetFacts: [],
      decisions: []
    }
  }

  render() {
    const { startFacts, targetFacts, decisions } = this.state

    return (
      <div className="block-world">
        <Module title="Start World">
          <SetupWorld
            updateWorld={facts => this.setState({startFacts: facts})}
            world={startFacts}
          />
        </Module>
        <Module title="Target World">
          <SetupWorld
            updateWorld={newWorld => this.setState({targetFacts: newWorld})}
            world={targetFacts}
          />
        </Module>
        <Module title="Decision Tree">
          <DecisionTree
            decisions={this.decisions}
          />
        </Module>
      </div>
    )
  }
}

export default BlockWorld
