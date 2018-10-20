import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    const newFacts = this.worldFacts(this.state.hooked, this.state.stacked)
    this.setState(
      newState,
      () => this.props.onUpdate(newFacts)
    )
  }

  /**
   * Generate the world facts given world state
   * @param      {string}  hooked   The hooked block
   * @param      {array}   stacked  The 2D array of hooked blocks
   */
  worldFacts(hooked, stacked) {
    let facts = []

    facts.push({
      hooked: hooked
    })

    stacked.forEach((row, columnIndex) => {
      row.forEach((block, rowIndex) => {
        if (rowIndex === 0) {
          facts.push({
            onTable: block
          })
        }
        if (rowIndex === row.length-1) {
          facts.push({
            nothingAbove: block
          })
        } else {
          facts.push({
            blockAbove: row[rowIndex+1]
          })
        }
      })
      if (row.length === 0) {
        facts.push({empty: columnIndex})
      }
    })

    return facts
  }

  /**
   * Push a block to the top of a column
   * @param      {int}     column  The column index
   * @param      {string}  color   The block color
   */
  push(column, color) {
    if (column === -1) {
      this.state.hooked = color
      this.updateWorld({
        hooked: color
      })
    } else {
      this.state.stacked[column].push(color)
      this.updateWorld({
        stacked: this.state.stacked
      })
    }
  }

  /**
   * Pop a block off the top of a column
   * @param      {int}  column  The column index
   */
  pop(column) {
    if (column === -1) {
      this.state.hooked = null
      this.updateWorld({
        hooked: null
      })
    } else {
      this.state.stacked[column].pop()
      this.updateWorld({
        stacked: this.state.stacked
      })
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
