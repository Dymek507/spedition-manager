
const DEFAULT_DATE = '0000-00-00 00:00:00'
const days = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', "Pią", "Sob"]

const DateDisplay = ({ dateString }: { dateString: string }) => {
  let dateStringDisplay = DEFAULT_DATE

  if (dateString !== "" && dateString !== undefined) {
    dateStringDisplay = dateString
  }
  const dateAndTimeArr = dateStringDisplay.split(' ')
  const dateArr = dateAndTimeArr[0].split('-')
  const day = new Date(dateStringDisplay).getDay()
  // if(dateAndTimeArr[1] === undefined) return (<p>Brak godziny</p>)
  // const timeArr = dateAndTimeArr[1].split(':')



  return (
    <div className='w-[6%] flex-col flex-center'>
      <div className='text-2xl'>{dateArr[2]}</div>
      {!!day && <div>{days[day]}</div>}
      <div>{dateArr[1] + "-" + dateArr[0]}</div>
    </div>
  )
}

export default DateDisplay