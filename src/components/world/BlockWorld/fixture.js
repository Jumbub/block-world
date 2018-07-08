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
      blocks: [
        ['blue'],
        [],
        []
      ]
    }
  },
  {
    component: BlockWorld,
    name: 'many',
    props: {
      blocks: [
        ['blue'],
        [],
        ['green', 'blue', 'red']
      ]
    }
  },
]
