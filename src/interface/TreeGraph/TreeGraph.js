import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-d3-tree';

class TreeGraph extends PureComponent {
  static SEPERATOR = 'seperator'
  
  /**
   * Create a new node on the tree.
   *
   * @param      {string}  name      The name
   * @param      {string}  children  The children
   * @param      {string}  type      The custom type
   * @return     {Object}  The new node
   */
  static newTreeNode(name, children, type) {
    const isSeperator = type === this.SEPERATOR
    const invisible = '#0000'
    return {
      name: name,
      children: children,
      nodeSvgShape: {
        shape: 'rect',
        shapeProps: {
          width: type === 'b' ? 175 : 225,
          height: 30,
          x: -5,
          y: -15,
          strokeWidth: 3,
          fill: isSeperator
            ? invisible
            : 'rgb(240, 240, 240)',
          stroke: isSeperator
            ? invisible
            : 'rgb('
              + (type === 'r' ? '200' : '50') + ','
              + (type === 'g' ? '200' : '50') + ','
              + (type === 'b' ? '200' : '50') + ')',
          rx: 5,
          ry: 5
        },
      }
    }
  }

  static propTypes = {
    tree: PropTypes.object
  }

  static defaultProps = {
    tree: {name: ''}
  }

  state = {}

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: 20,
        y: dimensions.height / 2
      }
    });
  }

  render() {
    return (
      <div ref={tc => (this.treeContainer = tc)} style={{
        width: '100%',
        height: '400px',
        backgroundColor: 'rgb(200, 200, 200)',
        fontFamily: 'Roboto, sans-serif'
      }}>
        <Tree 
          data={[this.props.tree]} 
          translate={this.state.translate} 
          orientation={'horizontal'}
          collapsible={false}
          nodeSize={{x: 250, y: 50}}
          nodeSvgShape={{
            shape: 'rect',
            shapeProps: {
              width: 5,
              height: 5,
              x: -2,
              y: -2,
            }
          }}
          textLayout={{
            textAnchor: 'start',
            y: 0
          }}
          styles={{
            links: {stroke: 'white', strokeWidth: 2 },
            nodes: {
              node: {
                name: { stroke: 'black', y: '10px' },
              },
              leafNode: {
                name: { stroke: 'black' },
              },
            },
          }}
        />
      </div>
    );
  }
}

export default TreeGraph
