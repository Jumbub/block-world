import ManualWorld from './ManualWorld'

export default [
  {
    component: ManualWorld,
    name: 'default'
  },
  {
    component: ManualWorld,
    name: 'random',
    props: {
      moves: [
        { name: 'hook B', onClick: () => alert('hook B') },
        { name: 'drop A', onClick: () => alert('drop A') },
        { name: 'drop C', onClick: () => alert('drop C') }
      ],
      world: {
        height: 5,
        hooked: {color: 'blue', key: 3},
        stacked: [
          [
            {color: 'blue', key: 3}
          ],
          [],
          [
            {color: 'blue', key: 0},
            {color: 'green', key: 1},
            {color: 'red', key: 2}
          ],
          [
            {color: 'green', key: 5},
            {color: 'green', key: 4},
          ]
        ]
      }
    }
  }
]
