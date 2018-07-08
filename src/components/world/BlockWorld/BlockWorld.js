import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Block from '../Block'
import Platform from './platform.png'
import './block-world.css'

class BlockWorld extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.number,
          color: PropTypes.string
        })
      )
    )
  }

  static defaultProps = {
    blocks: [[], [], []]
  }

  render() {
    const { blocks } = this.props

    return (
      <div className="block-world" id="block-world">
        <div className="world-row">
          {blocks.map(columns =>
            <div className="world-col">
              {columns.reverse().map(block => 
                <Block color={block} />
              )}
            </div>
          )}
        </div>
        <img className="block world-platform" src={Platform} alt="block platform"/>
      </div>
    )
  }
}

export default BlockWorld
