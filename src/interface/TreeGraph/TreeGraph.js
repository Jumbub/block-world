import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-d3-tree';

class TreeGraph extends PureComponent {
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
        width: '800px',
        height: '400px',
        backgroundColor: 'rgb(200, 200, 200)',
        fontFamily: 'Roboto, sans-serif'
      }}>
        <Tree 
          data={[this.props.tree]} 
          translate={this.state.translate} 
          orientation={'horizontal'}
          collapsible={false}
          nodeSize={{x: 200, y: 50}}
          nodeSvgShape={{
            shape: 'rect',
            shapeProps: {
              width: 5,
              height: 5,
              x: -2,
              y: -2,
            }
          }}
          styles={{
            links: {stroke: 'white', strokeWidth: 2 },
            nodes: {
              node: {
                circle: {stroke: 'black', strokeWidth: 1 },
                name: {stroke: 'black', strokeWidth: 1 },
                attributes: {stroke: 'black', strokeWidth: 1 },
              },
              leafNode: {
                circle: {stroke: 'black', strokeWidth: 1 },
                name: {stroke: 'black', strokeWidth: 1 },
                attributes: {stroke: 'black', strokeWidth: 1 },
              },
            },
          }}
        />
      </div>
    );
  }
}

export default TreeGraph
