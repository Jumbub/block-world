import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-tree-graph'

import './decision-tree.css'
import 'react-tree-graph/dist/style.css'
import Module from '../../interface/Module'

class DecisionTree extends Component {
  static propTypes = {
    tree: PropTypes.object
  }

  static defaultProps = {
    tree: {}
  }

  render() {
    const { tree } = this.props

    return (
      <Module title="Decision tree view">
        <Tree
          data={tree}
          height={400}
          width={600}
          svgProps={{
            className: 'tree'
          }}
        />
      </Module>
    )
  }
}

export default DecisionTree
