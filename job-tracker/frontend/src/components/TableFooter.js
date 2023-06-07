import {useEffect} from 'react'

const TableFooter = ({range, page, setPage, slice}) => {
    const canPrev = (page - 1) >= 1
    const canNext = (page + 1) <= range.length 

    useEffect(()=> {
        if(slice.length < 1 && page !== 1) {
            setPage(page - 1)
        }
    },[slice, page, setPage])

    const handlePrev = () => {
        if(canPrev) {
            setPage(page - 1)
        }
    }

    const handleNext = () => {
        if(canNext) {
            setPage(page + 1)
        }
    }

  return (
    <div className='w-full bg-slate-600 h-10 flex justify-center items-center border-2 border-white gap-2'>
        {canPrev?
            <button className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-slate-500 h-5 w-fit'
                onClick={handlePrev}>Prev</button>
            :
            null
        }
        <div className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-slate-500 h-5 w-5'>
            {page}
        </div>
        {canNext?
            <button className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-slate-500 h-5 w-fit'
                onClick={handleNext}>Next</button>
            :
            null
        }
    </div>
  )
}

export default TableFooter