import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'he-react-ui'

import './setup-world.css'
import World from '../../world/World'

/*const WorldType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.number,
    hooked: PropTypes.bool,
    clear: PropTypes.bool,
    above: PropTypes.number,
    column: PropTypes.number,
    color: PropTypes.string
  })
)*/

class SetupWorld extends Component {
  constructor() {
    super()

    this.state = {
      current: [],
      target: [],
      width: 3,
      height: 3,
      nextKey: 0,
    }

    this.addBlock = this.addBlock.bind(this)
    this.removeBlock = this.removeBlock.bind(this)
  }

  addBlock(worldLabel, col, color = 'red') {
    let world = this.state[worldLabel]
    let lastBlock = world.length > 0 && world.reduce((cur, block) => block.key > cur && block.key || cur)
    const key = this.state.nextKey

    let above = world.find(block => block.column === col && block.clear)
    let aboveKey = null
    if (above) {
      above.clear = false
      aboveKey = above.key
    }

    const block = {
      key: key,
      color: color,
      hooked: col === -1,
      clear: col !== -1,
      above: aboveKey,
      column: col
    }
    world.push(block)

    this.setState({
      [worldLabel]: world,
      nextKey: key + 1
    })
  }

  removeBlock(worldLabel, key) {
    let world = this.state[worldLabel]
    const removeBlock = world.find(block => block.key === key)
    const aboveBlock = world.find(block => block.above === key)
    const belowBlock = world.find(block => block.key === removeBlock.above)

    if (belowBlock) {
      if (aboveBlock) {
        aboveBlock.above = belowBlock.key
      } else {
        belowBlock.clear = true
      }
    } else if (aboveBlock) {
      aboveBlock.above = null
    }

    world = world.filter(
      block => block.key !== key
    )
    this.setState({
      [worldLabel]: world
    })
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  } 

  generateWorld(width, world) {
    const hooked = world.find(block => block.hooked)

    let stacked = []
    for (let col = 0; col < width; col++) {
      stacked[col] = []

      let block = world.find(block => block.clear && block.column === col)
      if (block) {
        stacked[col].push(block)
      }

      while (block && this.isNumber(block.above)) {
        let prevKey = block.above
        block = world.find(block => block.key === prevKey)
        stacked[col].push(block)
      }
      stacked[col] = stacked[col].reverse()
    }

    return {
      hooked: hooked,
      stacked: stacked
    }
  }

  render() {
    const { addBlock, removeBlock } = this
    const { height, current, target, width } = this.state

    const currentWorld = this.generateWorld(width, current)
    const targetWorld = this.generateWorld(width, target)

    return (
      <div className="setup-world">
        <div className="world-view">
          <Heading>Current</Heading>
          <World
            hooked={currentWorld.hooked}
            stacked={currentWorld.stacked}
            height={height}
            addBlock={(col, color) => addBlock('current', col, color)} 
            removeBlock={key => removeBlock('current', key)}
          />
        </div>
        <div className="world-view target-world">
          <Heading>Target</Heading>
          <World
            hooked={targetWorld.hooked}
            stacked={targetWorld.stacked}
            height={height}
            addBlock={(col, color) => addBlock('target', col, color)} 
            removeBlock={key => removeBlock('target', key)}
          />
        </div>
      </div>
    )
  }
}
export default SetupWorld
