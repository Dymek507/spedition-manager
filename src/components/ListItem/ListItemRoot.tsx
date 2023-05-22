import React from 'react'
import { ICargo, IRouteCords } from '../../types/model'
import DateDisplay from './DateDisplay'
import PlaceDisplay from './PlaceDisplay'
import company_logos from '../../assets/company_logos'
import { calculateDirections } from '../../helpers/calculateDirections'
import { useJsApiLoader } from '@react-google-maps/api'
import { DEFAULT_ROUTE_CORDS, getRouteCords } from '../../helpers/getRouteCords'
import Grid from '@mui/material/Unstable_Grid2/Grid2'


interface ListItemProps {
  cargo: ICargo
  openModal: (cargo: ICargo, routesOptions: google.maps.DirectionsResult | undefined, routeCords: IRouteCords) => void
}

const ListItem = ({ cargo, openModal }: ListItemProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    // libraries: ['places'],
  })

  const [routeCords, setRouteCords] = React.useState<IRouteCords>(DEFAULT_ROUTE_CORDS)
  const [routesOptions, setRoutesOptions] = React.useState<google.maps.DirectionsResult | undefined>()

  React.useEffect(() => {
    const getCords = async () => {
      //Function take cargo data and from zipcode and city create ALL places cords
      const cords = await getRouteCords(cargo)
      setRouteCords(cords)
      //Function take cords and calculate routes options
      const calculatedDirections = await calculateDirections(cords)
      setRoutesOptions(calculatedDirections)
    }
    if (cargo && isLoaded) {
      getCords()
    }
  }, [cargo, isLoaded])

  const openModalHandler = () => {
    openModal(cargo, routesOptions, routeCords)
  }

  return (
    <Grid container spacing={1} className='w-full overflow-x-hidden text-sm text-white xl:text-2xl flex-center bg-gradient-to-r from-indigo-500 to-black'>
      <Grid xxs={2} md={1} className="flex-center">
        <img src={company_logos.get(cargo.company ?? "solbet")} alt="Company_logo" />
      </Grid>
      <Grid xxs={3} md={1} className="flex-center text-[0.8em] text-center">
        <p>
          {cargo.id.slice(0, 18)}
        </p>
      </Grid>
      <Grid xxs={2} md={2}>
        <PlaceDisplay placeData={cargo.from} />
      </Grid>
      <Grid xxs={2} md={0.5} className="flex-center">
        {cargo.distance}
      </Grid>
      <Grid xxs={2} md={2}>
        <PlaceDisplay placeData={cargo.destination} />
      </Grid>
      {/* Second Line in xss devices */}
      <Grid xxs={2} md={1} className="p-2">
        <DateDisplay dateString={cargo.loadingDate} />
      </Grid>
      <Grid xxs={1} md={0.5} className="flex-center">
        {cargo.perKilometer}
      </Grid>
      <Grid xxs={1} md={0.5} className="flex-center">
        {cargo.surcharge}
      </Grid>
      <Grid xxs={2} md={0.5} className="flex-center">
        {cargo.price}
      </Grid>
      <Grid xxs={2} md={1}>
        <DateDisplay dateString={cargo.unloadDate} />
      </Grid>
      <Grid xs={12} md={1} className="flex-center">
        <button onClick={openModalHandler}>Szczegóły</button>
      </Grid>
    </Grid>
  )
}

export default ListItem

