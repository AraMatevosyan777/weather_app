import React from 'react'
import m from './nav.module.css'
import {NavLink} from 'react-router-dom'
import Toggle from './Toggle'
const Navbar = () => {
  return (
    <nav className={m.nav}>
        <NavLink activeClassName={m.active} to='/weather'>Home</NavLink>
        <NavLink activeClassName={m.active} to='/cities'>Favorite Cities</NavLink>
        <Toggle/>
    </nav>
  )
}

export default Navbar
