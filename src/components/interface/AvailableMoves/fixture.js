import AvailableMoves from './AvailableMoves'

export default [
  {
    component: AvailableMoves,
    name: 'default'
  },
  {
    component: AvailableMoves,
    name: 'hook available',
    props: {
      moves: [
        { name: 'hook A', onClick: () => alert('hook A') }
      ]
    }
  },
  {
    component: AvailableMoves,
    name: '3 moves available',
    props: {
      moves: [
        { name: 'hook B', onClick: () => alert('hook B') },
        { name: 'drop A', onClick: () => alert('drop A') },
        { name: 'drop C', onClick: () => alert('drop C') }
      ]
    }
  }
]
