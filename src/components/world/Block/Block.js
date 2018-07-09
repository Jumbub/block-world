import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockImage from './block.png'
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
      <img src={BlockImage} className={'block block-' + color} alt={color + ' block'}/>
    )
  }
}

export default Block
