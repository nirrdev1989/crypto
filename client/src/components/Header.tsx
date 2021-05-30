// import React from 'react'
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import CurrentDate from './CurrentDate'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideListAction } from '../redux/side-list/actions'
import { FilterIcon, MoonIcon, SunIcon } from '../icons'
import { RootState } from '../redux/store'
import { toggleTheme } from '../redux/theme/actions'


function Header() {
   const { isDark } = useSelector((state: RootState) => state.theme)
   const dispatch = useDispatch()

   useEffect(() => {
      window.document.documentElement.setAttribute('data-theme', `${isDark ? 'dark' : 'light'}`)
   }, [isDark])

   return (
      <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4">
         <p className="h5 my-0 me-md-auto fw-normal text-light text-bold">
            <button
               className="btn btn-sm btn-info"
               onClick={() => dispatch(toggleSideListAction())}>
               {FilterIcon}
            </button>
         </p>
         <div>
            <CurrentDate />
            <span
               className="theme-icon"
               style={{ color: isDark ? 'yellow' : 'black', fontSize: '25px', marginLeft: '1rem' }}
               onClick={() => {
                  dispatch(toggleTheme())
               }}>
               {isDark ? SunIcon : MoonIcon}
            </span>
         </div>
         <nav className="my-2 my-md-0 me-md-3">
            {/* <NavLink className="p-2" to="/" >Home</NavLink>
            <NavLink className="p-2" to="/history">History</NavLink>
            <NavLink className="p-2" to="/markets" >Markets</NavLink> */}
         </nav>
      </header>
   )
}

export default Header
