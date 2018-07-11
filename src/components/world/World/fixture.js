import World from './World'

export default [
  {
    component: World,
    name: 'default'
  },
  {
    component: World,
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
    component: World,
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
    component: World,
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
