import React, { useEffect, useMemo } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import ListItem from '../ListItem/ListItemRoot'
import InfoModal from '../InfoModal/InfoModal'
import { db } from "../../../firebase"
import { ICargo } from '../../types/model';
import TablerHeader from './TablerHeader';
import Toolbox from './Toolbox';
import sortCargos, { SortingVariants } from './helpers/sortCargos';

// const sortOptions: { label: string, type: SortingVariants }[] = [
//   { label: "price", type: SortingVariants.price },
//   { label: "loadDate", type: SortingVariants.loadingDate },

// ];

const List = () => {
  const [open, setOpen] = React.useState(false);
  const [cargo, setCargo] = React.useState({} as ICargo);
  const [cargoList, setCargoList] = React.useState<ICargo[]>([])
  const [selecredCargosIds, setSelectedCargosIds] = React.useState<string[]>([])
  const [showToolbox, setShowToolbox] = React.useState(false)
  const [sortingAtr, setSortingAtr] = React.useState<SortingVariants>(SortingVariants.loadingDate)
  const [sortingDir, setSortingDir] = React.useState<boolean>(true)

  const listItems = useMemo(
    () => sortCargos(cargoList, sortingAtr, sortingDir),
    [cargoList, sortingAtr, sortingDir])

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

  const handleSorting = (sortingAtr: SortingVariants, sortingDir: boolean) => {
    setSortingAtr(sortingAtr)
    setSortingDir(sortingDir)
  }


  return (
    <div className="flex flex-col gap-3 xl:gap-6 wh-full sm:p-4 xl:px-10 xl:pt-0 bg-gradient-to-r from-blue-300 to-blue-500 flex-center">
      <InfoModal open={open} closeHandler={closeModal} cargo={cargo} />
      <TablerHeader handleSorting={handleSorting} />
      {showToolbox && <Toolbox deleteCargos={deleteCargos} />}
      {listItems.map((item, index) => (
        <ListItem key={index} cargo={item} openModal={openModal} selecredCargosIds={selecredCargosIds} select={addToSelectedArrayIds} />
      ))}
    </div>
  )
}

export default List