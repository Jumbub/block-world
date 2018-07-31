import SetupWorld from './SetupWorld'
import SetupWorldWrapper from './SetupWorldWrapper'

export default [
  {
    component: SetupWorld,
    name: 'default',
  },
  {
    component: SetupWorldWrapper,
    name: 'wrapped tall world',
    props: {
      title: 'Tall world',
      width: 2,
      height: 5,
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null },
        { key: 1, color: 'green', hooked: false, clear: false, above: null, column: 0 },
        { key: 2, color: 'blue', hooked: false, clear: true, above: 1, column: 0 }
      ]
    }
  },
  {
    component: SetupWorldWrapper,
    name: 'wrapped short world',
    props: {
      title: 'Short world',
      width: 5,
      height: 2,
      world: [
        { key: 0, color: 'red', hooked: true, clear: null, above: null, column: null },
        { key: 1, color: 'green', hooked: false, clear: false, above: null, column: 0 },
        { key: 2, color: 'blue', hooked: false, clear: true, above: 1, column: 0 }
      ]
    }
  }
]
