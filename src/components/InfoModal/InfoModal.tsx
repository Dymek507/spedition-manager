import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ICargo, IRouteCords } from '../../types/model';
import React, { useEffect } from 'react';
import { DEFAULT_ROUTE_CORDS, getRouteCords } from '../../helpers/getRouteCords/getRouteCords';
import Map from './Map';


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

  const [routeCords, setRouteCords] = React.useState<IRouteCords>(DEFAULT_ROUTE_CORDS)

  useEffect(() => {
    async function getRoute() {
      console.log('infomodal useeffect')
      const cargoCords = await getRouteCords(cargo)
      console.log(cargoCords)
      setRouteCords(cargoCords)
    }
    if (cargo.from && cargo.destination) getRoute()

  }, [cargo])


  const closeModal = () => {
    closeHandler()
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
          {/* <div className='gap-6 flex-center'>
            {routeResult && routeResult.routes.map((route, index: number) => (
              <Typography key={index}>{route.legs[0].distance?.text}</Typography>
            ))}
          </div> */}
          <div className='bg-sky-500 h-4/6'>
            {/* <OpenStreetMapExample routeCords={routeCords} /> */}
            <Map routeCords={routeCords} />
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