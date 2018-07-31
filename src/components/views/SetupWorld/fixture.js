import SetupWorld from './SetupWorld'

import React, { Component, Fragment } from 'react'

class SetupWorldWrapper extends Component {
  state = {
    world: []
  }
  render() {
    return <SetupWorld
      world={this.state.world}
      width={this.props.width || undefined}
      height={this.props.height || undefined}
      title={this.props.title || undefined}
      updateWorld={newWorld => this.setState({world: newWorld})}
    />
  }
}

export default [
  {
    component: SetupWorldWrapper,
    name: 'default'
  },
  {
    component: SetupWorldWrapper,
    name: 'tall in target',
    props: {
      title: 'Target world',
      width: 2,
      height: 5,
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null },
        { key: 1, color: 'green', hooked: false, clear: false, above: null, column: 0 },
        { key: 2, color: 'blue', hooked: false, clear: true, above: 1, column: 0 }
      ]
    }
  },
  {
    component: SetupWorldWrapper,
    name: 'short in initial',
    props: {
      title: 'Initial world',
      width: 5,
      height: 2,
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null },
        { key: 1, color: 'green', hooked: false, clear: false, above: null, column: 0 },
        { key: 2, color: 'blue', hooked: false, clear: true, above: 1, column: 0 }
      ]
    }
  }
]
