import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './world.css'
import Hook from '../Hook'
import Block from '../Block'
import SelectorBlock from '../SelectorBlock'
import Platform from '../Platform'
import { BLOCK_COLORS } from '../Block'

class World extends Component {
  static propTypes = {
    hooked: PropTypes.oneOf(BLOCK_COLORS),
    stacked: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOf(BLOCK_COLORS)
      )
    ),
    height: PropTypes.number,
    pushColumn: PropTypes.func,
    popColumn: PropTypes.func
  }

  static defaultProps = {
    hooked: null,
    stacked: [[], [], []],
    height: 4,
    pushColumn: (column, color) => {},
    popColumn: column => {},
  }

  render() {
    const { hooked, stacked, height, pushColumn, popColumn } = this.props

    return (
      <div className="world-container" style={{height: 64*(height+4)}}>
        <Hook>
          {hooked
            ? <Block color={hooked} onClick={() => popColumn(-1)} />
            : <SelectorBlock onClick={color => pushColumn(-1, color)} />
          }
        </Hook>
        <div>
          <div className="block-container">
            <div className="container-row">
              {stacked.map((column, columnIndex) =>
                <div className="container-column" key={'column'+columnIndex}>
                  {column.map((block, rowIndex) =>
                    <Block
                      key={block+rowIndex}
                      color={block}
                      onClick={rowIndex === column.length-1 ? () => popColumn(columnIndex) : null}
                    />
                  )}
                  {column.length < height && <SelectorBlock onClick={color => pushColumn(columnIndex, color)}/>}
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
