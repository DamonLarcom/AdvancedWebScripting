import {useEffect} from 'react'
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import {MdFirstPage, MdLastPage} from 'react-icons/md'

const TableFooter = ({range, page, setPage, slice}) => {
    const canPrev = (page - 1) >= 1
    const canNext = (page + 1) <= range.length 

    useEffect(()=> {
        if(slice.length < 1 && page !== 1) {
            setPage(page - 1)
        }
    },[slice, page, setPage])

    const handleFirst = () => {
        setPage(1)
    }

    const handleLast = () => {
        setPage(range.length)
    }

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
    <div className='w-full bg-slate-600 h-10 flex justify-end items-center border-2 border-white gap-2 px-10'>
        <button className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-slate-400 h-5 w-fit'
            onClick={handleFirst}>
            <MdFirstPage/>
        </button>
        {canPrev?
            <button className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-red-500 h-5 w-fit'
                onClick={handlePrev}>
                    <GrFormPrevious/>
                </button>
            :
            null
        }
        <div className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-slate-500 h-5 w-fit'>
            Page {page}
        </div>
        {canNext?
            <button className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-green-500 h-5 w-fit'
                onClick={handleNext}>
                    <GrFormNext/>
                </button>
            :
            null
        }
        <button className='flex justify-center items-center p-3 font-bold rounded-full shadow-lg bg-slate-400 h-5 w-fit'
            onClick={handleLast}>
            <MdLastPage/>
        </button>
    </div>
  )
}

export default TableFooter