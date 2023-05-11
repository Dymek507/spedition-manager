import React from 'react'
import solbetLogo from '../assets/solbet.jpg'
import { ICargo } from '../data/sped-data'
import { dataConverter, stringDivide } from '../helpers/dataConverter'
import PlaceDisplay from './PlaceDisplay'

interface ListItemProps {
  itemData: ICargo
}


const ListItem = ({ itemData }: ListItemProps) => {
  const openModal = (id: string) => {
    console.log('open modal' + id)
  }
  return (
    <section className='flex gap-6 text-xl text-white border border-black bg-sky-700'>
      <div className='w-16 h-24 bg-white flex-center'>
        <img src={solbetLogo} alt="Company_logo" />
      </div>
      <div className='w-36 flex-center'>
        {itemData.id}
      </div>
      <PlaceDisplay placeData={itemData.from} />
      <div className='flex-center'>{itemData.distance}</div>
      <PlaceDisplay placeData={itemData.destination} />
      <div className='flex-center'>
        {itemData.perKilometer}
      </div>
      <div className='flex-center'>
        {itemData.surcharge}
      </div>
      <div className='flex-center'>
        {itemData.price}
      </div>
      <div className='flex-center'>
        {itemData.loadingDate}
      </div>
      <div className="flex-center">
        <button onClick={() => openModal(itemData.id)}>Szczegóły</button>
      </div>
    </section>

  )
}

export default ListItem

