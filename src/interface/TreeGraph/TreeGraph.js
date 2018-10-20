import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'

import './tree-graph.css'

class TreeGraph extends Component {
  static propTypes = {
    tree: PropTypes.object
  }

  static defaultProps = {
    tree: {}
  }

  render() {
    const { tree } = this.props

    return (
        <Tree
          data={tree}
          height={400}
          width={600}
          svgProps={{
            className: 'tree'
          }}
        />
    )
  }
}

export default TreeGraph
