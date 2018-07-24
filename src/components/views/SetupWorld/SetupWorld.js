import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

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
    height: PropTypes.number
  }

  static defaultProps = {
    world: [],
    width: 5,
    height: 4
  }

  render() {
    const { world, width, height } = this.props

    return (
      <div className="setup-world">
        <World height={height} />
      </div>
    )
  }
}
export default SetupWorld
