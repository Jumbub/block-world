import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WorldFacts from '../../logic/WorldFacts'
import World from '../../world/World'

class SetupWorld extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    onUpdate: facts => {},
    width: 3,
    height: 3
  }

  constructor(props) {
    super()
    
    this.state = {
      stacked: this.newStacks(props.width),
      hooked: null,
    }

    this.push = this.push.bind(this)
    this.pop = this.pop.bind(this)
    this.updateWorld = this.updateWorld.bind(this)
  }

  render() {
    const { height } = this.props
    const { hooked, stacked } = this.state

    return (
      <World
        hooked={hooked}
        stacked={stacked}
        height={height}
        pushColumn={this.push} 
        popColumn={this.pop}
      />
    )
  }

  /**
   * Update the higher components with new world facts
   * @param      {object}  newState  The new state
   */
  updateWorld(newState) {
    const newFacts = new WorldFacts(this.state.hooked, this.state.stacked)
    this.setState(
      newState,
      () => this.props.onUpdate(newFacts)
    )
  }

  /**
   * Push a block to the top of a column
   * @param      {int}     column  The column index
   * @param      {string}  color   The block color
   */
  push(column, color) {
    if (column === -1) {
      let newState = this.state
      newState.hooked = color
      this.updateWorld(newState)
    } else {
      let newState = this.state
      newState.stacked[column].push(color)
      this.updateWorld(newState)
    }
  }

  /**
   * Pop a block off the top of a column
   * @param      {int}  column  The column index
   */
  pop(column) {
    if (column === -1) {
      let newState = this.state
      newState.hooked = null
      this.updateWorld(newState)
    } else {
      let newState = this.state
      newState.stacked[column].pop()
      this.updateWorld(newState)
    }
  }

  /**
   * Create a new stack of blocks given width
   * @param      {number}  width   2D array of width
   */
  newStacks(width) {
    let world = []
    for (var i = 0; i < width; i++) {
      world[i] = []
    }
    return world
  }
}
export default SetupWorld
