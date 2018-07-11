import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './hook.css'
import HookImage from './hook.png'
import Block from '../Block'

class Hook extends Component {
  static propTypes = {
    block: PropTypes.shape({
      key: PropTypes.number,
      color: PropTypes.string
    })
  }

  render() {
    const { block } = this.props

    return (
      <div className="hook-container">
        <img src={HookImage} alt="world hook" className="block hook"/>
        {block &&
          <div className="block-hooked">
            <Block color={block.color} key={block.key}/>
          </div>
        }
      </div>
    )
  }
}

export default Hook
