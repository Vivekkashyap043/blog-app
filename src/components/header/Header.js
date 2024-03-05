import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {resetState} from '../../redux/slices/userAuthorSlice'

function Header() {

    let {loginUserStatus, errorOccured, errMsg, currentUser} = useSelector(state => state.userAuthorLoginReducer)
    let dispatch = useDispatch();
    function logout(){
        localStorage.removeItem('token')
        dispatch(resetState())
    }

  return (
      <ul className='nav p-3 bg-dark fs-5'>
          {
              loginUserStatus === false ?
                  <div className='d-flex justify-content-end w-100'>
                      <li className='nav-item'>
                          <NavLink className="nav-link" to="">Home</NavLink>
                      </li>
                      <li className='nav-item'>
                          <NavLink className="nav-link" to="login">Login</NavLink>
                      </li>
                      <li className='nav-item'>
                          <NavLink className="nav-link" to="register">Register</NavLink>
                      </li>
                  </div>
                  :
                  <div className='d-flex justify-content-between w-100'>
                      <li className='nav-item' >
                          <p className='text-white fs-3' style={{ marginTop: "8px", marginRight: "20px" }}>Welcome {currentUser.username}</p>
                      </li>
                      <div className='d-flex justify-content-center'>
                          <li className='nav-item'>
                              <NavLink className="nav-link" to="">Home</NavLink>
                          </li>
                          <li className='nav-item' >
                              <NavLink className="nav-link" to="login" onClick={logout}>Logout</NavLink>
                          </li>
                      </div>
                  </div>
                  
          }
      </ul>
  )
}

export default Header
