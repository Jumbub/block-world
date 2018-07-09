import BlockWorld from './BlockWorld'

export default [
  {
    component: BlockWorld,
    name: 'default'
  },
  {
    component: BlockWorld,
    name: 'single',
    props: {
      stacked: [
        [
          {color: 'blue', key: 0}
        ],
        [],
        []
      ]
    }
  },
  {
    component: BlockWorld,
    name: 'hooked',
    props: {
      hooked: {color: 'red', key: 0},
      stacked: [
        [],
        [],
        []
      ]
    }
  },
  {
    component: BlockWorld,
    name: 'many',
    props: {
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
  },
]
