import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockImage from './block.png'
import './block.css'

class Block extends Component {
  static propTypes = {
    color: PropTypes.string,
    onDelete: PropTypes.func
  }

  static defaultProps = {
    color: 'original',
    onDelete: () => {}
  }

  render() {
    const { color, onDelete } = this.props

    return (
      <img src={BlockImage} className={'block block-' + color} alt={color + ' block'} onClick={onDelete}/>
    )
  }
}

export default Block
