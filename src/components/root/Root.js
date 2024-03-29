import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Root() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'81.1vh'}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Root
