import SetupWorld from './SetupWorld'

export default [
  {
    component: SetupWorld,
    name: 'default'
  },
  {
    component: SetupWorld,
    name: 'many',
    props: {
      width: 3,
      height: 3,
      current: [
        { key: 1, color: 'red', hooked: true, clear: false, above: null, column: null },
        { key: 2, color: 'green', hooked: false, clear: true, above: null, column: 0 },
        { key: 3, color: 'blue', hooked: false, clear: false, above: 2, column: 0 }
      ],
      target: [
        { key: 1, color: 'blue', hooked: false, clear: true, above: -1, column: 1 }
      ]
    }
  },
]
