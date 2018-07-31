import React, { Component, Fragment } from 'react'
import SetupWorld from './SetupWorld'

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

export default SetupWorldWrapper

