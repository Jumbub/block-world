import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockImage from './block.png'
import './block.css'

const COLORS = [ 'red', 'green', 'blue' ]

class Block extends Component {
  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    color: 'original',
    onClick: () => {}
  }

  render() {
    const { color, onClick } = this.props

    return (
      <img
        src={BlockImage}
        className={'block block-anim block-' + color}
        alt={color + ' block'}
        onClick={onClick}
      />
    )
  }
}

export default Block
export { COLORS }
