import DecisionTree from './DecisionTree'

export default [
  {
    component: DecisionTree,
    name: 'default'
  },
  {
    component: DecisionTree,
    name: 'example',
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
