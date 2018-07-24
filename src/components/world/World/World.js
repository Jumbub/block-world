import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './world.css'
import Hook from '../Hook'
import Block from '../Block'
import AirBlock from '../AirBlock'
import Platform from '../Platform'

class World extends Component {
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
    stacked: [[], [], []],
    height: 4
  }

  render() {
    const { stacked, hooked, height } = this.props

    return (
      <div className="world-container">
        <Hook>
          {hooked && <Block color={hooked.color} key={hooked.key}/>}
        </Hook>
        <div className="block-container">
          <div className="container-row">
            {stacked.map((column, i) =>
              <div className="container-column">
                {column.map(block => 
                  <Block color={block.color} key={block.key}/>
                )}
                {column.length < height && <AirBlock/>}
              </div>
            )}
          </div>
        </div>
        <Platform width={stacked.length}/>
      </div>
    )
  }
}

export default World
