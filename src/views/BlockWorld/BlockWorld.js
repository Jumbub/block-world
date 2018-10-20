import React, { Component } from 'react'

import './block-world.css'
import TreeGraph from '../../interface/TreeGraph'
import SetupWorld from '../SetupWorld'
import Module from '../../interface/Module'

class BlockWorld extends Component {
  constructor() {
    super()

    this.state = {
      startFacts: [],
      targetFacts: [],
      decisions: {name:''}
    }

    this.go = this.go.bind(this)
  }

  render() {
    const { startFacts, targetFacts, decisions } = this.state

    return (
      <div className="block-world">
        <Module title="Start World">
          <SetupWorld
            onUpdate={facts => this.setState({startFacts: facts})}
            world={startFacts}
          />
          {startFacts.map(fact => <p>{JSON.stringify(fact)}</p>)}
        </Module>
        <Module title="Target World">
          <SetupWorld
            onUpdate={newWorld => this.setState({targetFacts: newWorld})}
            world={targetFacts}
          />
          {targetFacts.map(fact => <p>{JSON.stringify(fact)}</p>)}
        </Module>
        <button onClick={this.go} className="module" style={{fontSize: '24px'}}>Go</button>
        <Module title="Decision Tree">
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
    const tree = {
      name: '',
      children: this.formattedFacts(this.state.startFacts)
    }

    this.setState({
      decisions: tree
    })
  }

  formattedFacts(facts) {
    let hadAnEmpty = false
    return facts.map(fact => {
      if (fact.platformSpace) {
        if (hadAnEmpty) {
          return undefined
        } else {
          hadAnEmpty = true
          return {name:'space()'}
        }
      } else if (fact.onPlatform) {
        return {name: 'onPlatform(' + fact.onPlatform + ')'}
      } else if (fact.nothingAbove) {
        return {name: 'clear(' + fact.nothingAbove + ')'}
      } else if (fact.blockAbove) {
        return {name: 'above(' + fact.blockAbove + ',' + fact.block + ')'}
      } else if (fact.hooked) {
        return {name: 'hooked(' + fact.hooked + ')'}
      } else if (fact.nothingHooked) {
        return {name: 'nothingHooked()'}
      } else {
        window.console.error('Invalid fact:', fact)
        return {name: 'ERROR'}
      }
    }).filter(fact => fact !== undefined)
  }
}

export default BlockWorld
