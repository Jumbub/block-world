import DecisionTree from './DecisionTree'

export default [
  {
    component: DecisionTree,
    name: 'default'
  },
  {
    component: DecisionTree,
    name: 'example',
    props: {
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null },
        { key: 1, color: 'green', hooked: false, clear: false, above: null, column: 0 },
        { key: 2, color: 'blue', hooked: false, clear: true, above: 1, column: 0 }
      ]
    }
  },
  {
    component: DecisionTree,
    name: 'hooked',
    props: {
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null }
      ]
    }
  },
  {
    component: DecisionTree,
    name: 'duplicate colors',
    props: {
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null },
        { key: 1, color: 'red', hooked: false, clear: true, above: null, column: 0 }
      ]
    }
  }
]
