import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BlockImage from '../Block/block.png'
import SelectorBlock from '../SelectorBlock'
import './air-block.css'

class AirBlock extends Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  state = {
    hovering: false
  }

  render() {
    const { onClick } = this.props
    const { hovering } = this.state

    return (
      <div onMouseEnter={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false})}>
        { hovering
          ? <SelectorBlock onClick={onClick} />
          : <img src={BlockImage} className="air-block block-anim" alt="air block"/>
        }
      </div>
    )
  }
}

export default AirBlock
