import React from 'react'

function Card({ children }: any) {
   return (
      <div className="col-md-12  mt-3 mb-3">
         <div className="card  shadow-sm">
            {children}
         </div>
      </div>
   )
}

// function CardHeader({children}:any)

export default Card
