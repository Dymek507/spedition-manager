import { ICargo } from '../../types/model'

const DistanceDisplay = ({ cargo }: { cargo: ICargo }) => {
  return (
    <div className='flex-col flex-center'>
      <p>
        {cargo.distance}
      </p></div>
  )
}

export default DistanceDisplay