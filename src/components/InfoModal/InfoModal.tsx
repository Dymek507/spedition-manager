import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { ICargo, IRouteCords } from '../../types/model';
import React from 'react';
import { DEFAULT_ROUTE_CORDS, getRouteCords } from '../../helpers/getRouteCords';
import { calculateDirections } from '../../helpers/calculateDirections';


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
}


const InfoModal = ({ open, closeHandler, cargo }: InfoModalProps) => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    // libraries: ['places'],
  })

  const [routeResult, setRouteResult] = React.useState<google.maps.DirectionsResult | undefined>()
  const [routeCords, setRouteCords] = React.useState<IRouteCords>(DEFAULT_ROUTE_CORDS)

  React.useEffect(() => {
    const getRoute = async () => {
      //Function take cargo data and from zipcode and city create ALL places cords
      const cords = await getRouteCords(cargo)
      setRouteCords(cords)
      //Function take cords and calculate routes options
      const calculatedDirections = await calculateDirections(cords)
      setRouteResult(calculatedDirections)
    }
    if (cargo && isLoaded) {
      getRoute()
    }
  }, [cargo, isLoaded])

  const closeModal = () => {
    closeHandler()
    setRouteResult(undefined)
    setRouteCords(DEFAULT_ROUTE_CORDS)
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
            {routeResult && routeResult.routes.map((route, index: number) => (
              <Typography key={index}>{route.legs[0].distance?.text}</Typography>
            ))}
          </div>
          <div className='bg-sky-500 h-4/6'>
            {isLoaded && routeCords &&
              <GoogleMap zoom={7} center={routeCords.center} mapContainerClassName='h-[600px]'>
                {routeResult &&
                  <DirectionsRenderer directions={routeResult} />
                }
              </GoogleMap>
            }
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