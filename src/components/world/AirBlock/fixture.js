import AirBlock from './AirBlock'

export default [
  {
    component: AirBlock,
    name: 'default'
  },
  {
    component: AirBlock,
    name: 'with on click',
    props: {
      onClick: () => alert('adding red block')
    }
  },
]
