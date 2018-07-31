import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'he-react-ui'

import './module.css'

class Module extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
  }

  render() {
    const { title, children } = this.props

    return (
      <div className="module">
        <div className="module-items">
          {title &&
            <div className="module-title">
              <Heading h1>{title}</Heading>
            </div>
          }
          {children &&
            <div className="module-content">
              {children}
            </div>
          }
        </div>
      </div>
    )
  }
}
export default Module
