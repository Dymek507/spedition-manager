import React, { useEffect } from 'react'
import { collection, doc, onSnapshot } from "firebase/firestore";
import ListItem from './ListItem/ListItemRoot'
import InfoModal from './InfoModal/InfoModal'
import { db } from "../../firebase"
import { ICargo } from '../types/model';

const List = () => {
  const [open, setOpen] = React.useState(false);
  const [cargo, setCargo] = React.useState({} as ICargo);
  const [cargoList, setCargoList] = React.useState<ICargo[]>([])
  const [selecredCargosIds, setSelectedCargosIds] = React.useState<string[]>([])

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

  return (
    <div className="flex flex-col gap-3 xl:gap-6 wh-full sm:p-4 xl:px-10 xl:pt-0 bg-zinc-600 flex-center">
      <InfoModal open={open} closeHandler={closeModal} cargo={cargo} />
      {cargoList.map((item, index) => (
        <ListItem key={index} cargo={item} openModal={openModal} selecredCargosIds={selecredCargosIds} select={addToSelectedArrayIds} />
      ))}
    </div>
  )
}

export default List