import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { ICargo, IRouteCords } from '../../types/model';
import React from 'react';


const style = {
  position: 'absolute',
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
  routesOptions: google.maps.DirectionsResult | undefined
  routeCords: IRouteCords
}


const InfoModal = ({ open, closeHandler, cargo, routesOptions, routeCords }: InfoModalProps) => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    // libraries: ['places'],
  })

  const [routeResult, setRouteResult] = React.useState<google.maps.DirectionsResult | undefined>()

  React.useEffect(() => {
    const calculateDirections = async () => {
      console.log(routeCords)
      const directions = await new google.maps.DirectionsService().route({
        origin: routeCords.from,
        destination: routeCords.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setRouteResult(directions)
      console.log(directions)
    }
    if (routeCords && isLoaded) {
      calculateDirections()
    }
  }, [routeCords, isLoaded])


  const closeModal = () => {
    closeHandler()
    setRouteResult(undefined)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='gap-6 flex-center'>
            {routesOptions && routesOptions.routes.map((route, index: number) => (
              <Typography key={index}>{route.legs[0].distance?.text}</Typography>
            ))}
          </div>
          <div className='bg-sky-500 h-4/6'>
            <GoogleMap zoom={7} center={routeCords.center} mapContainerClassName='h-[600px]'>
              {routeResult && <DirectionsRenderer directions={routeResult} />}
            </GoogleMap>
          </div>
          <div>
            {cargo.comments ? cargo.comments : 'Brak komentarza'}
          </div>
        </Box>
      </Modal>
    </div>
  );
}


export default InfoModal