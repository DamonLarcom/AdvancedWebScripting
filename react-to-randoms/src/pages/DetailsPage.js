import React from 'react'
import {useParams} from 'react-router-dom'

const DetailsPage = () => {
    let {name} = useParams()

  return (
    <div>DetailsPage for: {name}</div>
  )
}

export default DetailsPage