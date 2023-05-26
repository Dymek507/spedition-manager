import { ICargo, IRouteCords } from '../../types/model'
import DateDisplay from './DateDisplay'
import PlaceDisplay from './PlaceDisplay'
import company_logos from '../../assets/company_logos'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import sendDistanceToFirebase from '../../helpers/sendDistanceToFirebase'
import React from 'react'
import State from './State'


interface ListItemProps {
  cargo: ICargo
  openModal: (cargo: ICargo) => void
  selecredCargosIds: string[]
  select: (id: string) => void
}

const ListItem = ({ cargo, openModal, selecredCargosIds, select }: ListItemProps) => {

  const [selected, setSelected] = React.useState(false)


  useEffect(() => {
    if (selecredCargosIds.includes(cargo.id)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [selecredCargosIds])

  // useEffect(() => {
  //   sendDistanceToFirebase(cargo)
  // }, [cargo])

  const openModalHandler = () => {
    openModal(cargo)
  }

  const perKilometer = () => {
    if (cargo.price && cargo.distance) {
      const perKilometer = (cargo.price / cargo.distance).toFixed(2)
      return perKilometer
    } else {
      return 0
    }
  }

  return (
    <Grid container spacing={1} className='w-full overflow-x-hidden text-sm text-white xl:text-2xl flex-center'
      style={{ backgroundColor: selected ? "gray" : 'black' }}>
      {/* Checkbox */}
      <Grid item xxs={1} md={0.5} className="flex-center">
        <input type="checkbox" className='w-5 h-5' checked={selected} onChange={() => select(cargo.id)} />
      </Grid>
      {/* State */}
      <Grid item xxs={1} md={0.5} className="flex-center wh-full">
        <State cargo={cargo} />
      </Grid>
      {/* Logo */}
      <Grid item xxs={2} md={1} className="flex-center" >
        <img src={company_logos.get(cargo.company ?? "solbet")} alt="Company_logo" />
      </Grid>
      {/* Id*/}
      <Grid item xxs={3} md={1} className="flex-center text-[0.6em] text-center">
        <p>
          {cargo.id.slice(0, 18)}
        </p>
      </Grid>
      <Grid item xxs={2} md={2}>
        <PlaceDisplay placeData={cargo.from} />
      </Grid>
      <Grid item xxs={2} md={0.5} className="flex-center">
        {cargo.distance}
      </Grid>
      <Grid item xxs={2} md={2}>
        <PlaceDisplay placeData={cargo.destination} />
      </Grid>
      {/* Second Line in xss devices */}
      <Grid item xxs={2} md={1} className="p-2">
        <DateDisplay dateString={cargo.loadingDate} />
      </Grid>
      <Grid item xxs={1} md={0.5} className="flex-center">
        {perKilometer()}
      </Grid>
      <Grid item xxs={1} md={0.5} className="flex-center">
        {cargo.surcharge || 0}
      </Grid>
      <Grid item xxs={2} md={0.5} className="flex-center">
        {cargo.price.toFixed(0)}
      </Grid>
      <Grid item xxs={2} md={1}>
        <DateDisplay dateString={cargo.unloadDate} />
      </Grid>
      <Grid item xxs={12} md={1} className="flex-center">
        <button onClick={openModalHandler}>Szczegóły</button>
      </Grid>
    </Grid>
  )
}

export default ListItem

