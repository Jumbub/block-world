import Hook from './Hook'

export default [
  {
    component: Hook,
    name: 'default'
  },
  {
    component: Hook,
    name: 'hooked red block',
    props: {
      block: {
        color: 'red',
        key: 0,
      }
    }
  }
]
