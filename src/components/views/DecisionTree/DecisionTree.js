import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-tree-graph'

import './decision-tree.css'
import 'react-tree-graph/dist/style.css'

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
      <div className="decision-tree">
        <Tree
          data={tree}
          height={400}
          width={600}
          svgProps={{
            className: 'tree'
          }}
        />
      </div>
    )
  }
}

export default DecisionTree
