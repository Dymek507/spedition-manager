
const State = ({ state }: { state: string }) => {
  let stateColor = ''

  switch (state) {
    case 'active':
      stateColor = 'green'
      break;
    case 'Minął czas':
      stateColor = 'red'
      break;
    default:
      stateColor = 'yellow'
      break;
  }
  return (
    <div className='flex-center text-[0.8em]' style={{ backgroundColor: stateColor }}><p>{state}</p></div>
  )
}

export default State