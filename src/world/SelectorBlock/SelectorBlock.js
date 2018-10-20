import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './selector-block.css'
import '../Block/block.css'
import PlatformLeft from '../Platform/platform-left.png'
import PlatformRight from '../Platform/platform-right.png'
import PlatformMiddle from '../Platform/platform-middle.png'
import { BLOCK_COLORS } from '../Block'

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
        {BLOCK_COLORS.map((color, i) =>
          <img
            src={this.getSource(i)}
            alt={'place ' + color + ' block'}
            onClick={() => onClick(color)}
            className={'block block-hoverable block-' + color}
            key={'select-' + color}
          />
        )}
      </div>
    )
  }

  getSource(index) {
    if (index === 0) {
      return PlatformLeft
    } else if (index < BLOCK_COLORS.length-1) {
      return PlatformMiddle
    } else {
      return PlatformRight
    }
  }
}

export default SelectorBlock
