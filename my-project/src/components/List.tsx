import React from 'react'
import ListItem from './ListItem'
import solbetData from '../data/solbet2.json'


const List = () => {
  // dataConverter(solbetData)
  return (
    <div className='flex flex-col w-4/6 gap-4 wh-full'>
      {solbetData.map((item, index) => (
        <ListItem key={index} itemData={item} />
      ))}
    </div>

  )
}

export default List