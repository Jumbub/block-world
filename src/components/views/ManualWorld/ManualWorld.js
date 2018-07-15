import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import './manual-world.css'
import AvailableMoves from '../../interface/AvailableMoves'
import World from '../../world/World'

class ManualWorld extends Component {
  static propTypes = {
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        onClick: PropTypes.func
      })
    ),
    world: {
      hooked: PropTypes.shape({
        key: PropTypes.number,
        color: PropTypes.string
      }),
      stacked: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.number,
            color: PropTypes.string
          })
        )
      ),
      height: PropTypes.number
    }
  }

  static defaultProps = {
    moves: [],
    world: {
      hooked: null,
      stacked: [[], [], []],
      height: 3
    }
  }

  render() {
    const { moves, world } = this.props

    return (
      <Fragment>
        <div className="manual-title">Manually control the world</div>
        <div className="manual-world">
          <div className="view-world">
            <World hooked={world.hooked} stacked={world.stacked} height={world.height} className="ui-container" />
          </div>
          <div className="action-world">
            <AvailableMoves moves={moves} className="ui-container" />
          </div>
        </div>
      </Fragment>
    )
  }
}
export default ManualWorld
