import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WorldFacts from '../../logic/WorldFacts'
import World from '../../world/World'
import { BLOCK_COLORS } from '../../world/Block'

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
      availableColors: BLOCK_COLORS
    }

    this.push = this.push.bind(this)
    this.pop = this.pop.bind(this)
    this.updateWorld = this.updateWorld.bind(this)
  }

  render() {
    const { height } = this.props
    const { hooked, stacked, availableColors } = this.state

    return (
      <World
        hooked={hooked}
        stacked={stacked}
        height={height}
        availableColors={availableColors}
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
    const newFacts = WorldFacts.createFromWorld(this.state.hooked, this.state.stacked)
    const blocksCheck = newState.availableColors.sort().toString()
    this.setState(
      newState,
      () => this.props.onUpdate(newFacts, blocksCheck)
    )
  }

  /**
   * Push a block to the top of a column
   * @param      {int}     column  The column index
   * @param      {string}  color   The block color
   */
  push(column, color) {
    let newState = this.state
    newState.availableColors = newState.availableColors.filter(colorItem => colorItem !== color)
    if (column === -1) {
      newState.hooked = color
    } else {
      newState.stacked[column].push(color)
    }
    this.updateWorld(newState)
  }

  /**
   * Pop a block off the top of a column
   * @param      {int}  column  The column index
   */
  pop(column) {
    let newState = this.state
    if (column === -1) {
      newState.availableColors.push(newState.hooked)
      newState.hooked = null
    } else {
      const color = newState.stacked[column].pop()
      newState.availableColors.push(color)
    }
    this.updateWorld(newState)
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
