import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ArrowImage from './arrow.png'
import './arrow.css'
import { Button } from 'reactstrap';

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
      <Button color="link">
        Solve
        <br></br>
        <img
          src={ArrowImage}
          className={'arrow '+(onClick ? 'arrow-hoverable' : 'arrow-disabled')}
          onClick={onClick}
          alt="arrow"
        />
      </Button>
    )
  }
}

export default Arrow
