import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './selector-block.css'
import '../Block/block.css'
import PlatformLeft from '../Platform/platform-left.png'
import PlatformRight from '../Platform/platform-right.png'
import PlatformMiddle from '../Platform/platform-middle.png'
import PlatformSingle from '../Platform/platform-single.png'
import { BLOCK_COLORS } from '../Block'

class SelectorBlock extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    colors: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    onClick: () => {},
    colors: BLOCK_COLORS,
  }

  constructor() {
    super()

    this.getSource = this.getSource.bind(this)
  }

  render() {
    const { onClick, colors } = this.props
    
    return (
      <div className="selector-block platform">
        {colors && colors.map((color, i) =>
          <img
            src={this.getSource(i, colors.length)}
            alt={'place ' + color + ' block'}
            onClick={() => onClick(color)}
            className={'block block-hoverable block-' + color}
            key={'select-' + color}
            style={{width: ''+(100/colors.length)+'%'}}
          />
        )}
      </div>
    )
  }

  getSource(index, length) {
    const { colors } = this.props

    if (length === 1) {
      return PlatformSingle
    } else if (index === 0) {
      return PlatformLeft
    } else if (index < colors.length-1) {
      return PlatformMiddle
    } else {
      return PlatformRight
    }
  }
}

export default SelectorBlock
