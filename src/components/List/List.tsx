import React, { useEffect } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import ListItem from '../ListItem/ListItemRoot'
import InfoModal from '../InfoModal/InfoModal'
import { db } from "../../../firebase"
import { ICargo } from '../../types/model';
import { Tab, Table } from '@mui/material';
import TablerHeader from './TablerHeader';
import Toolbox from './Toolbox';

const List = () => {
  const [open, setOpen] = React.useState(false);
  const [cargo, setCargo] = React.useState({} as ICargo);
  const [cargoList, setCargoList] = React.useState<ICargo[]>([])
  const [selecredCargosIds, setSelectedCargosIds] = React.useState<string[]>([])
  const [showToolbox, setShowToolbox] = React.useState(false)


  const cargosRef = collection(db, "cargos");

  useEffect(() => {
    const unsub = onSnapshot(cargosRef, (cargos) => {
      const firebaseCargosList = [] as ICargo[]
      cargos.forEach((cargo) => {
        firebaseCargosList.push(cargo.data() as ICargo)
      });
      setCargoList(firebaseCargosList)
    });
    return () => {
      unsub()
    }
  }, [])

  //Show toolbox if there is at least one cargo selected
  useEffect(() => {
    if (selecredCargosIds.length > 0) {
      setShowToolbox(true)
    } else {
      setShowToolbox(false)
    }
  }, [selecredCargosIds])


  const openModal = (cargo: ICargo) => {
    setCargo(cargo)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  const addToSelectedArrayIds = (id: string) => {
    const newSelectedArray = [...selecredCargosIds]
    if (newSelectedArray.includes(id)) {
      const index = newSelectedArray.indexOf(id)
      newSelectedArray.splice(index, 1)
    } else {
      newSelectedArray.push(id)
    }
    setSelectedCargosIds(newSelectedArray)
  }

  const deleteCargos = () => {
    selecredCargosIds.forEach(async (id) => {
      const cargoRef = doc(db, "cargos", id)
      await deleteDoc(cargoRef);
    })
    setSelectedCargosIds([])
  }





  return (
    <div className="flex flex-col gap-3 xl:gap-6 wh-full sm:p-4 xl:px-10 xl:pt-0 bg-gradient-to-r from-green-500 to-green-700 flex-center">
      <InfoModal open={open} closeHandler={closeModal} cargo={cargo} />
      <TablerHeader />
      {showToolbox && <Toolbox deleteCargos={deleteCargos} />}
      {cargoList.map((item, index) => (
        <ListItem key={index} cargo={item} openModal={openModal} selecredCargosIds={selecredCargosIds} select={addToSelectedArrayIds} />
      ))}
    </div>
  )
}

export default List