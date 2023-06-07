import {useState} from 'react'
import ApplicationRow from './ApplicationRow'
import TableFooter from './TableFooter'
import usePaginate from "../usePaginate"

const Table = ({apps, perPage}) => {
    const [page, setPage] = useState(1)
    const {slice, range} = usePaginate(apps, page, perPage)

    const noApplications = slice.length === 0

  return (
    <>
        <table className='w-full h-fit border-2 border-white'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Title</th>
                    <th>Date Applied</th>
                    <th className='w-1/3'>Link</th>
                </tr>
            </thead>
            <tbody className='overflow-y-hidden'>
                {
                    !noApplications?
                    slice.map((app, index) => (
                        <ApplicationRow app={app} key={index}/>
                    ))
                    :
                    null
                }
            </tbody>
        </table>
        {noApplications? 
            <h1 className='text-xl mt-2 text-center'>No Applications to show.</h1>
            :
            <TableFooter len={apps.length} range={range} page={page} setPage={setPage} slice={slice}/>
        }
    </>
  )
}

export default Table