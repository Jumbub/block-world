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
    removeBlock: (key, color) => {},
    addBlock: key => {},
  }

  render() {
    const { stacked, hooked, height, addBlock, removeBlock } = this.props

    return (
      <div className="world-container" style={{height: 64*(height+3.5)}}>
        <Hook>
          {hooked
            ? <Block color={hooked.color} key={hooked.key} onClick={() => removeBlock(hooked.key)} />
            : <AirBlock onClick={() => addBlock(-1)} onClick={() => addBlock(-1, 'red')} />
          }
        </Hook>
        <div>
          <div className="block-container">
            <div className="container-row">
              {stacked.map((column, columnIndex) =>
                <div className="container-column">
                  {column.map(block => 
                    <Block color={block.color} key={block.key} onClick={() => removeBlock(block.key)} />
                  )}
                  {column.length < height && <AirBlock onClick={() => addBlock(columnIndex, 'red')}/>}
                </div>
              )}
            </div>
          </div>
          <Platform width={stacked.length}/>
        </div>
      </div>
    )
  }
}

export default World
