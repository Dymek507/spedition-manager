import React from 'react'
import ListItem from './ListItem'
import solbetData from '../data/solbet2.json'
import { Modal } from '@mui/material'
import InfoModal from './InfoModal'
import { ICargo } from '../types/modelTypes'



const List = () => {
  // dataConverter(solbetData)
  const [open, setOpen] = React.useState(false);
  const [cargo, setCargo] = React.useState({} as ICargo);
  const openModal = (itemData: ICargo) => {
    setCargo(itemData)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  return (
    <div className='flex flex-col w-4/6 gap-4 wh-full'>
      <InfoModal open={open} closeHandler={closeModal} cargo={cargo} />
      {solbetData.map((item, index) => (
        <ListItem key={index} itemData={item} openModal={openModal} />
      ))}
    </div>

  )
}

export default List