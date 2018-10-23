import Platform from './Platform'

export default [
  {
    component: Platform,
    name: 'default'
  },
  {
    component: Platform,
    name: '5 wide',
    props: {
      width: 5
    }
  },
  {
    component: Platform,
    name: 'single',
    props: {
      width: 1
    }
  }
]
