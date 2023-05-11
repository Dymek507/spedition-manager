import React from 'react'
import { stringDivide } from '../helpers/dataConverter'

interface PlaceDisplayProps {
  placeData: string
}

const PlaceDisplay = ({ placeData }: PlaceDisplayProps) => {
  const dividedPlace = stringDivide(placeData)
  return (
    <div className='flex-col text-sm flex-center'>
      <p>
        {dividedPlace.code}
      </p>
      <p>
        {dividedPlace.city}
      </p>
      <p>
        {dividedPlace.voivodeship}
      </p>
    </div>
  )
}

export default PlaceDisplay