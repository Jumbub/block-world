import SetupWorld from './SetupWorld'

export default [
  {
    component: SetupWorld,
    name: 'default',
    state: {
      current: [],
      target: [],
      width: 3,
      height: 3,
    }
  },
  {
    component: SetupWorld,
    name: 'many',
    state: {
      width: 3,
      height: 3,
      nextKey: 4,
      current: [
        { key: 0, color: 'red', hooked: true, clear: false, above: null, column: null },
        { key: 1, color: 'green', hooked: false, clear: true, above: null, column: 0 },
        { key: 2, color: 'blue', hooked: false, clear: false, above: 1, column: 0 }
      ],
      target: [
        { key: 3, color: 'blue', hooked: false, clear: true, above: -1, column: 1 }
      ]
    }
  },
]
