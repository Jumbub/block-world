import Block from './Block'

export default [
  {
    component: Block,
    name: 'default'
  },
  {
    component: Block,
    name: 'red',
    props: {
      color: 'red'
    }
  },
  {
    component: Block,
    name: 'blue',
    props: {
      color: 'blue'
    }
  },
  {
    component: Block,
    name: 'green',
    props: {
      color: 'green'
    }
  },
]
