// import React from 'react'
import { NavLink } from 'react-router-dom'
import React from 'react'
import CurrentDate from './CurrentDate'
import { useDispatch } from 'react-redux'
import { toggleSideListAction } from '../redux/side-list/actions'
import { FilterIcon } from '../icons'

function Header() {

   const dispatch = useDispatch()

   return (
      <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4">
         <p className="h5 my-0 me-md-auto fw-normal text-light text-bold">
            <button className="btn btn-sm btn-info" onClick={() => dispatch(toggleSideListAction())}>{FilterIcon}</button>
         </p>
         <CurrentDate />
         <nav className="my-2 my-md-0 me-md-3">
            {/* <NavLink className="p-2" to="/" >Home</NavLink>
            <NavLink className="p-2" to="/history">History</NavLink>
            <NavLink className="p-2" to="/markets" >Markets</NavLink> */}
         </nav>
      </header>
   )
}

export default Header
