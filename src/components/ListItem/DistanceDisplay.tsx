import { ICargo } from '../../types/model'

const DistanceDisplay = ({ cargo }: { cargo: ICargo }) => {
  return (
    <div className='w-[2%] flex-center flex-col'>
      <p>
        {cargo.distance}
      </p></div>
  )
}

export default DistanceDisplay