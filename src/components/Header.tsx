import React from 'react'
import { NavLink } from 'react-router-dom'


function Header() {
   return (
      <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4  bg-body border-bottom shadow-sm">
         <p className="h5 my-0 me-md-auto fw-normal">Crypto</p>
         <nav className="my-2 my-md-0 me-md-3">
            <NavLink className="p-2" to="/" >Home</NavLink>
            {/* <NavLink className="p-2" to="/history">History</NavLink>
            <NavLink className="p-2" to="/markets" >Markets</NavLink> */}
         </nav>
      </header>
   )
}

export default Header
