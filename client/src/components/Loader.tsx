import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


function Loader() {
   const color = useSelector((state: RootState) => state.coin.coin.color)
   return (
      <div className="loader-con">
         <div style={{ color: color }} className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   )
}

export default Loader
