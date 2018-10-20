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
          'blue'
        ],
        [],
        []
      ],
      pushColumn: (column, color) => alert('pushing ' + color + ' to column #' + column),
      popColumn: column => alert('popping column #' + column),
    }
  },
  {
    component: World,
    name: 'hooked',
    props: {
      hooked: 'red',
      stacked: [
        [],
        [],
        []
      ],
      pushColumn: (column, color) => alert('pushing ' + color + ' to column #' + column),
      popColumn: column => alert('popping column #' + column),
    }
  },
  {
    component: World,
    name: 'many',
    props: {
      hooked: 'blue',
      stacked: [
        [
          'blue'
        ],
        [],
        [
          'blue',
          'green',
          'red'
        ],
        [
          'green',
          'green',
        ]
      ],
      pushColumn: (column, color) => alert('pushing ' + color + ' to column #' + column),
      popColumn: column => alert('popping column #' + column),
    }
  },
]
