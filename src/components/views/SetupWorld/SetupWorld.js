import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'he-react-ui'

import './setup-world.css'
import World from '../../world/World'
import Module from '../../interface/Module'

let LAST_KEY = 0

class SetupWorld extends Component {
  static propTypes = {
    updateWorld: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    world: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        color: PropTypes.string,
        hooked: PropTypes.boolean,
        clear: PropTypes.boolean,
        above: PropTypes.number,
        column: PropTypes.number
      })
    )
  }

  static defaultProps = {
    updateWorld: () => {},
    width: 3,
    height: 3,
    world: [],
  }

  constructor() {
    super()

    this.addBlock = this.addBlock.bind(this)
    this.removeBlock = this.removeBlock.bind(this)
  }

  shouldComponentUpdate() {
    return true
  }

  addBlock(col, color = 'red') {
    let world = this.props.world
    let lastBlock = world.length > 0 && world.reduce((cur, block) => block.key > cur && block.key || cur)
    const key = LAST_KEY

    let above = world.find(block => block.column === col && block.clear)
    let aboveKey = null
    if (above) {
      above.clear = false
      aboveKey = above.key
    }

    const block = {
      key: key,
      color: color,
      hooked: col === null,
      clear: col !== null,
      above: aboveKey,
      column: col
    }
    world.push(block)

    this.props.updateWorld(world)
    LAST_KEY += 1
  }

  removeBlock(key) {
    let world = this.props.world
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

    this.props.updateWorld(world)
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
    const { height, width, world, title } = this.props

    const renderedWorld = this.generateWorld(width, world)

    return (
      <Module title={title}>
        <World
          hooked={renderedWorld.hooked}
          stacked={renderedWorld.stacked}
          height={height}
          addBlock={addBlock} 
          removeBlock={removeBlock}
        />
      </Module>
    )
  }
}
export default SetupWorld
