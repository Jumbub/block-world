import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockImage from './block.png'
import './block.css'

const BLOCK_COLORS = ['red', 'green', 'blue', 'yellow']

class Block extends Component {

  static propTypes = {
    color: PropTypes.oneOf(BLOCK_COLORS),
    onClick: PropTypes.func
  }

  static defaultProps = {
    color: 'original',
    onClick: null
  }

  render() {
    const { color, onClick } = this.props

    return (
      <img
        src={BlockImage}
        className={'block block-' + color + (onClick ? ' block-hoverable' : '')}
        alt={color + ' block'}
        onClick={onClick}
      />
    )
  }
}

export default Block
export { BLOCK_COLORS }
