import SetupWorld from './SetupWorld'

export default [
  {
    component: SetupWorld,
    name: 'default'
  },
  {
    component: SetupWorld,
    name: 'empty world',
    props: {
      width: 3,
      height: 3,
      onUpdate: facts => console.log(facts)
    }
  },
  {
    component: SetupWorld,
    name: 'world with blocks',
    props: {
      width: 3,
      height: 3,
      onUpdate: facts => console.log(facts)
    },
    state: {
      stacked: [
        ['red', 'blue', 'green'],
        ['blue', 'green'],
        ['green']
      ],
      hooked: 'red'
    }
  },
]
