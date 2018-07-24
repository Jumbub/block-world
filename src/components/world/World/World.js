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
    height: PropTypes.number,
    addBlock: PropTypes.func,
    removeBlock: PropTypes.func
  }

  static defaultProps = {
    hooked: null,
    stacked: [[], [], []],
    height: 4,
    removeBlock: () => {},
    addBlock: () => {},
  }

  render() {
    const { stacked, hooked, height, addBlock, removeBlock } = this.props

    return (
      <div className="world-container">
        <Hook>
          {hooked
            ? <Block color={hooked.color} key={hooked.key}/>
            : <AirBlock onClick={() => addBlock(-1)}/>
          }
        </Hook>
        <div className="block-container">
          <div className="container-row">
            {stacked.map((column, i) =>
              <div className="container-column">
                {column.map(block => 
                  <Block color={block.color} key={block.key} onClick={() => removeBlock(block.key)} />
                )}
                {column.length < height && <AirBlock onClick={() => addBlock(i)}/>}
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
