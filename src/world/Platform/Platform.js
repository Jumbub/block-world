import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlatformLeft from './platform-left.png'
import PlatformRight from './platform-right.png'
import PlatformMiddle from './platform-middle.png'
import PlatformSingle from './platform-single.png'

class Platform extends Component {
  static propTypes = {
    width: PropTypes.number
  }

  static defaultProps = {
    width: 2
  }

  render() {
    const { width } = this.props

    return (
      <div className="platform">
        {width === 1
          ?
            <img src={PlatformSingle} alt="platform" className="block" key={'single-platform'} />
          :
            Array(width).fill(' ').map((item, i) =>
              (i === 0 && <img src={PlatformLeft} alt="platform" className="block" key={'left-platform'} />)
              || (i === width - 1 && <img src={PlatformRight} alt="platform" className="block" key={'right-platform'}/>)
              || <img src={PlatformMiddle} alt="platform" className="block" key={'middle-platform-'+i}/>
            )
        }
      </div>
    )
  }
}

export default Platform
