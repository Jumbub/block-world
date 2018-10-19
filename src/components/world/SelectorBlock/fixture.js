import SelectorBlock from './SelectorBlock'

export default [
  {
    component: SelectorBlock,
    name: 'default'
  },
  {
    component: SelectorBlock,
    name: 'with on click',
    props: {
      onClick: () => alert('adding block')
    }
  },
]
