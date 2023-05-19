import { ILocation } from "../../types/model"

interface PlaceDisplayProps {
  placeData: ILocation
}

const PlaceDisplay = ({ placeData }: PlaceDisplayProps) => {
  return (
    <div className='flex-col text-sm flex-center w-36'>
      <p>
        {placeData.zipCode}
      </p>
      <p>
        {placeData.city}
      </p>
      <p className='text-center'>
        {placeData.voivodeship}
      </p>
    </div>
  )
}

export default PlaceDisplay