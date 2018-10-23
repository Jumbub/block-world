import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ArrowImage from './arrow.png'
import './arrow.css'

class Arrow extends Component {

  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: undefined
  }

  render() {
    const { onClick } = this.props

    return (
      <img
        src={ArrowImage}
        className={'arrow '+(onClick ? 'arrow-hoverable' : 'arrow-disabled')}
        onClick={onClick}
        alt="arrow"
      />
    )
  }
}

export default Arrow
