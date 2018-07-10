import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './block-world.css'
import Hook from './hook.png'
import Block from '../Block'
import Platform from '../Platform'

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
          <img src={Hook} alt="world hook" className="block hook"/>
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
                {column.map(block => 
                  <Block color={block.color} key={block.key}/>
                )}
              </div>
            )}
          </div>
        </div>
        <Platform width={stacked.length}/>
      </div>
    )
  }
}

export default BlockWorld
