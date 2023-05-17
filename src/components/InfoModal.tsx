
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GoogleMap, useLoadScript, MarkerF, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { ICargo } from '../types/modelTypes';
import adressToCord from '../helpers/adressToCord';
import { colors } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface InfoModalProps {
  open: boolean
  closeHandler: () => void
  cargo: ICargo
}


const InfoModal = ({ open, closeHandler, cargo }: InfoModalProps) => {
  const [routesArray, setRoutesArray] = React.useState<any>([])

  const [centerLocation, setCenterLocation] = React.useState({ lat: 52.237049, lng: 21.017532 })
  const [fromLocation, setFromLocation] = React.useState({ lat: 0, lng: 0 })
  const [destinationLocation, setDestinationLocation] = React.useState({ lat: 0, lng: 0 })
  const [directionsResponse, setDirectionsResponse] = React.useState<any>(null)
  const [distance, setDistance] = React.useState<undefined | string>()

  const calculateRoute = async (fromCords, destinationCords) => {
    if (fromLocation === undefined || destinationLocation === undefined) return
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: fromCords,
      destination: destinationCords,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });
    console.log(results)
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance?.text)
  }

  React.useEffect(() => {
    const getCords = async () => {
      if (cargo.from === undefined || cargo.destination === undefined) return
      const fromCords = await adressToCord(cargo.from)
      setFromLocation(fromCords)
      const destinationCords = await adressToCord(cargo.destination)
      setDestinationLocation(destinationCords)
      const center = { lat: (fromCords.lat + destinationCords.lat) / 2, lng: (fromCords.lng + destinationCords.lng) / 2 }
      setCenterLocation(center)
      await calculateRoute(fromCords, destinationCords)
    }
    getCords()
  }, [cargo])

  const closeModal = () => {
    closeHandler()
    setDirectionsResponse(null)
    setDistance(undefined)
  }

  // const { isLoaded } = useLoadScript({
  //   // @ts-ignore
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  // })


  const { isLoaded } = useJsApiLoader({
    // @ts-ignore
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    // libraries: ['places'],
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex-center'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {distance}
            </Typography>
          </div>

          {/* <div className='bg-red-400'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {cargo.comments}
            </Typography>
          </div> */}
          <div className='bg-sky-500 h-4/6'>
            <GoogleMap zoom={7} center={centerLocation} mapContainerClassName='h-[600px]'>
              {/* {!!fromLocation && !!destinationLocation &&
                <>
                  <MarkerF position={fromLocation} />
                  <MarkerF position={destinationLocation} icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'} />
                </>} */}
              {!!directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
          </div>
        </Box>
      </Modal>
    </div>
  );
}


export default InfoModal