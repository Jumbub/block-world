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
    width: 5,
    height: 4,
  }

  generateWorld(width, world) {
    const hooked = world.find(block => block.hooked)
    // alert('hooked > ' + hooked)

    let stacked = []
    for (let i = width - 1; i >= 0; i--) {
      stacked[i] = []
    }

    const tops = world.filter(block => block.clear)
    tops.forEach(block => {
      stacked[block.column][0] = block
    })
    const mids = world.filter(block =>
      tops.find(top => top.key === block.above)
    )
    mids.forEach(block => {
      stacked[block.column][1] = block
    })
    console.log(stacked)

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
