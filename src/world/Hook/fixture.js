import React from 'react'

import Hook from '../Hook'
import Block from '../Block'
import SelectorBlock from '../SelectorBlock'

export default [
  {
    component: Hook,
    name: 'default'
  },
  {
    component: Hook,
    name: 'hooked red block',
    props: {
      children: (<Block color="red" onClick={() => alert('clicked!')}/>)
    }
  },
  {
    component: Hook,
    name: 'hooked selector block',
    props: {
      children: (<SelectorBlock onClick={color => alert('clicked ' + color + '!')}/>)
    }
  }
]
