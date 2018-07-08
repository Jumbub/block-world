import React, { Component } from 'react'
import PropTypes from 'prop-types'
import block from './block.png'
import './block.css'

class Block extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  static defaultProps = {
    color: 'original'
  }

  render() {
    const { color } = this.props

    return (
      <div className="block">
        <img src={block} className={'block-image block-' + color} alt={color + ' block'}/>
      </div>
    )
  }
}

export default Block
