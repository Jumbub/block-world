import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, Button } from 'he-react-ui'

import PlatformLeft from '../Platform/platform-left.png'
import PlatformRight from '../Platform/platform-right.png'
import PlatformMiddle from '../Platform/platform-middle.png'
import './selector-block.css'
import { COLORS } from '../Block'

class SelectorBlock extends Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const { onClick } = this.props

    return (
      <div className="selector-block platform">
        <img src={PlatformLeft} alt="platform" className="block block-anim block-red" key={'left-selector'} onClick={() => onClick('red')} />
        <img src={PlatformMiddle} alt="platform" className="block block-anim block-green" key={'middle-selector'} onClick={() => onClick('green')} />
        <img src={PlatformRight} alt="platform" className="block block-anim block-blue" key={'right-selector'} onClick={() => onClick('blue')} />
      </div>
    )
  }
}

export default SelectorBlock
