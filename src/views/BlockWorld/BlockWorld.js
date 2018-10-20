import React, { Component, Fragment } from 'react'

import DecisionTree from '../DecisionTree'
import SetupWorld from '../SetupWorld'

class BlockWorld extends Component {
  state = {
    initialWorld: [],
    targetWorld: [],
  }

  render() {
    const { initialWorld, targetWorld } = this.state

    return (
      <Fragment>
        <DecisionTree
          initialWorld={initialWorld}
        />
        <SetupWorld
          title="Initial world"
          updateWorld={newWorld => this.setState({initialWorld: newWorld})}
          world={initialWorld}
        />
        <SetupWorld
          title="Target world"
          updateWorld={newWorld => this.setState({targetWorld: newWorld})}
          world={targetWorld}
        />
      </Fragment>
    )
  }
}

export default BlockWorld
