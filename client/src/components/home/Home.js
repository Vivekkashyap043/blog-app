import React from 'react'
import './Home.css';
import homelogo from '../../assets/homologo.png'

function Home() {
  return (
    <div className='main' >
      <img src={homelogo}  className="homeimg" alt="home" />
      <div className='right'>
        <h1 className='art'>Blog App</h1>
        <p className='p1'>A blog app is a platform designed to facilitate the creation, publishing, and sharing of written content online. These apps serve as a medium for individuals, organizations, and businesses to express their ideas, share information, and engage with their audience.</p>
        <h1> Let's go into the world of articles</h1>
      </div>
    </div>
  )
}

export default Home
