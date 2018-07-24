import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './hook.css'
import HookImage from './hook.png'
import Block from '../Block'

class Hook extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  static defaultProps = {
    children: null
  }

  render() {
    const { children } = this.props

    return (
      <div className="hook-container">
        <img src={HookImage} alt="world hook" className="block hook"/>
        <div className="block-hooked">
          {children}
        </div>
      </div>
    )
  }
}

export default Hook
