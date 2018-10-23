import BlockWorld from './BlockWorld'

export default [
  {
    component: BlockWorld,
    name: 'default'
  },
  {
    component: BlockWorld,
    name: '2x2',
    props: {
      width: 2,
      height: 2
    }
  }
]
