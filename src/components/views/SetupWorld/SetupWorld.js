import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'he-react-ui'

import './setup-world.css'
import World from '../../world/World'

const WorldType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.number,
    hooked: PropTypes.bool,
    clear: PropTypes.bool,
    above: PropTypes.number,
    column: PropTypes.number,
    color: PropTypes.string
  })
)

class SetupWorld extends Component {
  static propTypes = {
    current: WorldType,
    target: WorldType,
    width: PropTypes.number,
    height: PropTypes.number,
    addBlock: PropTypes.func,
    removeBlock: PropTypes.func,
  }

  static defaultProps = {
    current: [],
    target: [],
    width: 3,
    height: 3,
  }

  generateWorld(width, world) {
    const hooked = world.find(block => block.hooked)

    let stacked = []
    for (let col = 0; col < width; col++) {
      stacked[col] = []

      const top = world.find(block => block.clear && block.column === col)
      if (top) stacked[col].push(top)
      let lastKey = top && top.key || null

      while (lastKey !== null) {
        const below = world.find(block => block.above === lastKey)

        if (below) {
          stacked[col].push(below)
          lastKey = below.key
        } else {
          lastKey = null
        }
      }
    }
    console.log('>>>>', stacked, hooked || null)

    return {
      hooked: hooked,
      stacked: stacked
    }
  }

  render() {
    const { addBlock, removeBlock } = this
    const { height, current, target, width } = this.props

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
            // addBlock={(column) => addBlock('current', column)} 
            removeBlock={removeBlock} />
        </div>
        <div className="world-view target-world">
          <Heading>Target</Heading>
          <World
            hooked={targetWorld.hooked}
            stacked={targetWorld.stacked}
            height={height}
            // addBlock={(column) => addBlock('target', column)} 
            removeBlock={removeBlock} />
        </div>
      </div>
    )
  }
}
export default SetupWorld
