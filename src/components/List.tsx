import React, { useEffect } from 'react'
import { collection, doc, onSnapshot } from "firebase/firestore";
import ListItem from './ListItem'
import InfoModal from './InfoModal'
import { db } from "../../firebase"
import { ICargo } from '../types/model';



const List = () => {
  // dataConverter(solbetData)
  const [open, setOpen] = React.useState(false);
  const [cargo, setCargo] = React.useState({} as ICargo);
  const [cargoList, setCargoList] = React.useState<ICargo[]>([])
  const openModal = (itemData: ICargo) => {
    setCargo(itemData)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  console.log(cargoList)

  const cargosRef = collection(db, "cargos");

  useEffect(() => {

    const unsub = onSnapshot(cargosRef, (cargos) => {
      const firebaseCargosList = [] as ICargo[]
      cargos.forEach((cargo) => {
        firebaseCargosList.push(cargo.data() as ICargo)
        console.log("Current cargos in CA: ")
      });
      setCargoList(firebaseCargosList)
    });

    return () => {
      unsub()
    }
  }, [])

  return (
    <div className='flex flex-col w-4/6 gap-4 wh-full'>
      <InfoModal open={open} closeHandler={closeModal} cargo={cargo} />
      {cargoList.map((item, index) => (
        <ListItem key={index} itemData={item} openModal={openModal} />
      ))}
    </div>

  )
}

export default List