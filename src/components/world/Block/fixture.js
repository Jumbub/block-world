import Block from './Block'

export default [
  {
    component: Block,
    name: 'default'
  },
  {
    component: Block,
    name: 'delete action',
    props: {
      onDelete: () => alert('delete action!')
    }
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
  {
    component: Block,
    name: 'purple',
    props: {
      color: 'purple'
    }
  },
  {
    component: Block,
    name: 'teal',
    props: {
      color: 'teal'
    }
  },
  {
    component: Block,
    name: 'pink',
    props: {
      color: 'pink'
    }
  },
]
