import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './block-world.css'
import Hook from './hook.png'
import Block from '../Block'
import PlatformLeft from './platform-left.png'
import PlatformRight from './platform-right.png'
import PlatformMiddle from './platform-middle.png'

class BlockWorld extends Component {
  static propTypes = {
    hooked: PropTypes.shape({
      key: PropTypes.number,
      color: PropTypes.string
    }),
    stacked: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.number,
          color: PropTypes.string
        })
      )
    ),
    height: PropTypes.number
  }

  static defaultProps = {
    hooked: null,
    stacked: [[], [], []]
  }

  render() {
    const { stacked, hooked } = this.props

    return (
      <div className="world-container">
        <div className="hook-container">
          <img src={Hook} alt="world hook" className="hook"/>
          {hooked &&
            <div className="block-hooked">
              <Block color={hooked.color} key={hooked.key}/>
            </div>
          }
        </div>
        <div className="block-container">
          <div className="container-row">
            {stacked.map((column, i) =>
              <div className="container-column">
                {
                  (i === 0 && <img src={PlatformLeft} alt="platform" className="block" key={'left-platform'} />)
                  || (i === stacked.length - 1 && <img src={PlatformRight} alt="platform" className="block" key={'right-platform'}/>)
                  || <img src={PlatformMiddle} alt="platform" className="block" key={'middle-platform-'+i}/>
                }
                {column.map(block => 
                  <Block color={block.color} key={block.key}/>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default BlockWorld
