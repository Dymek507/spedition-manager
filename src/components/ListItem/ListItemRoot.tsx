import { ICargo } from '../../types/model'
import DateDisplay from './DateDisplay'
import PlaceDisplay from './PlaceDisplay'
import company_logos from '../../assets/company_logos'


interface ListItemProps {
  cargo: ICargo
  openModal: (itemData: ICargo) => void
}

const ListItem = ({ cargo, openModal }: ListItemProps) => {
  return (
    <section className='flex gap-6 text-xl text-white border border-black bg-sky-700'>
      <div className='w-24 h-24 bg-white flex-center'>
        <img src={company_logos.get(cargo.company ?? "solbet")} alt="Company_logo" />
      </div>
      <div className='w-36 flex-center'>
        {cargo.id.slice(0, 18)}
      </div>
      <PlaceDisplay placeData={cargo.from} />
      <div className='w-[2%] flex-center'>{cargo.distance}</div>
      <PlaceDisplay placeData={cargo.destination} />
      <div className='w-[3%] flex-center'>
        {cargo.perKilometer}
      </div>
      <div className='w-[3%] flex-center'>
        {cargo.surcharge}
      </div>
      <div className='w-[4%] flex-center'>
        {cargo.price}
      </div>
      <DateDisplay dateString={cargo.loadingDate} />
      <DateDisplay dateString={cargo.unloadDate} />
      <div className="flex-center">
        <button onClick={() => openModal(cargo)}>Szczegóły</button>
      </div>
    </section>

  )
}

export default ListItem

