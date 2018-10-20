import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ArrowImage from './arrow.png'

class Arrow extends Component {

  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: null
  }

  render() {
    const { onClick } = this.props

    return (
      <img
        src={ArrowImage}
        class={onClick !== null ? 'arrow-disabled' : 'arrow-hoverable'}
        alt="arrow"
      />
    )
  }
}

export default Arrow
