import React from 'react'
import { TiHome } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

const GoBackButton = () => {
    const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/')} className="w-fit h-fit">
        <TiHome className="w-6 h-6" />
    </button>
  )
}

export default GoBackButton