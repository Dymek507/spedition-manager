import { Grid } from '@mui/material'
import { HEADER_ITEMS } from './data/header-data'

const TablerHeader = () => {
  return (
    <Grid container spacing={1} className='w-full overflow-x-hidden text-white text-md xl:text-lg flex-center bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    >
      {HEADER_ITEMS.map(({ name, xxs, md }, index) => (
        <Grid item key={index} xxs={xxs} md={md} className="text-[0.8em] text-center flex-center" >
          {name}
        </Grid>
      ))}
    </Grid>
  )
}

export default TablerHeader