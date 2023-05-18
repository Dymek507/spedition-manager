import { ICargo } from '../types/model'
import PlaceDisplay from './PlaceDisplay'


interface ListItemProps {
  itemData: ICargo
  openModal: (itemData: ICargo) => void
}

const ListItem = ({ itemData, openModal }: ListItemProps) => {
  return (
    <section className='flex gap-6 text-xl text-white border border-black bg-sky-700'>
      <div className='w-24 h-24 bg-white flex-center'>
        <img src="https://www.abud.pl/data/lang/pol/producers/gfx/projector/1393515502_1.jpg" alt="Company_logo" />
      </div>
      <div className='w-36 flex-center'>
        {itemData.id.slice(0, 18)}
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
        <button onClick={() => openModal(itemData)}>Szczegóły</button>
      </div>
    </section>

  )
}

export default ListItem

