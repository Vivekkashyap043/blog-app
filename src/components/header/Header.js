import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
        <ul className='nav justify-content-end p-3 bg-dark fs-5'>
            <li className='nav-item'>
                <NavLink className="nav-link" to="">Home</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className="nav-link" to="signin">Signin</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className="nav-link" to="signup">Signup</NavLink>
            </li>
        </ul>
  )
}

export default Header
