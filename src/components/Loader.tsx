import React from 'react'

function Loader() {
   return (
      <div className="loader-con">
         <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   )
}

export default Loader
