import TreeGraph from './TreeGraph'

export default [
  {
    component: TreeGraph,
    name: 'default'
  },
  {
    component: TreeGraph,
    name: '2 children',
    props: {
      tree: {
        name: 'Parent',
        children: [{
          name: 'Child One'
        }, {
          name: 'Child Two'
        }]
      }
    }
  }
]
