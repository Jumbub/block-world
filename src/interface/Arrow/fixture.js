import Arrow from './Arrow'

export default [
  {
    component: Arrow,
    name: 'default'
  },
  {
    component: Arrow,
    name: 'example',
    props: {
      onClick: () => alert('clicked!')
    }
  }
]
