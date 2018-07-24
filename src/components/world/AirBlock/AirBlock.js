import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockImage from '../Block/block.png'
import './air-block.css'

class AirBlock extends Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const { onClick } = this.props

    return (
      <img src={BlockImage} onClick={onClick} className="air-block" alt="air block"/>
    )
  }
}

export default AirBlock
