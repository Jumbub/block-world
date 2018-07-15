import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './available-moves.css'

class AvailableMoves extends Component {
  static propTypes = {
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        onClick: PropTypes.func
      })
    )
  }

  render() {
    const { moves } = this.props
console.log('[[', moves)
    return (
      <div className="available-moves">
        <div className="label">
          Available moves
        </div>
        {moves
        ? moves.map(item =>
          <button onClick={item.onClick}>
            {item.name}
          </button>
        )
        : <button disabled>No moves available</button>}
      </div>
    )
  }
}

export default AvailableMoves
