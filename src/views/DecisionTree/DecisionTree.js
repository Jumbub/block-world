import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Module from '../../interface/Module'
import TreeGraph from '../../interface/TreeGraph'

class DecisionTree extends Component {
  static propTypes = {
    decisions: PropTypes.any
  }

  static defaultProps = {
    world: []
  }

  getWorldFacts(world) {
    let labels = []

    // Hooked blocks
    const armHooked = world.find(block => block.hooked)
    if (armHooked) {
      labels.push({name: 'Hooked ' + armHooked.color})
    } else {
      labels.push({name: 'Nothing hooked'})
    }

    // Blocks on table
    let colors = []
    world.forEach(block => {
      if (colors[block.color] === undefined) {
        colors[block.color] = 1
      } else {
        colors[block.color] += 1
      }
    })
    colors.forEach((count, color) => {
      const colorCap = color.charAt(0).toUpperCase() + color.substr(1)
      labels.push({name: colorCap + ' block' + count === 1 ? 's' : ' on table'})
    })

    // No blocks above
    world
      .filter(block => block.clear)
      .forEach(block => {
        labels.push({name: 'Nothing above ' + block.color})
      })

    return labels
  }

  isInvalidWorld(world) {
    // Hack to prevent multiple blocks with same colors

    // Determine if matching number of blocks for each color


    return false
  }

  generateTree(world) {

    const labels = this.getWorldFacts(world)

    let tree = {
      children: labels
    }

    return tree
  }

  render() {
    const { world } = this.props
    const invalid = this.isInvalidWorld(world)

    return (
      invalid
        ? invalid
        : <TreeGraph tree={this.generateTree(world)} />
    )
  }
}

export default DecisionTree
