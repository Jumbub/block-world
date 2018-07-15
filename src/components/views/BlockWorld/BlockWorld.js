import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BlockWorldLogic, DecisionTree } from '../../../services/decision-tree-ai'
import ManualWorld from '../ManualWorld'

class BlockWorld extends Component {
  state = {
    world: []
  }

  render() {
    const { world } = this.state

    return (
      <ManualWorld />
    )
  }
}
export default BlockWorld
