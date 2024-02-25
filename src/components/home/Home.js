import React from 'react'
import './Home.css';
import homelogo from '../images/homologo.png'

function Home() {
  return (
    <div className='main' style={{minHeight:"81.1vh", background:"#566573"}}>
      <img src={homelogo}  className="homeimg" alt="home" />
      <div className='right'>
        <h1 className='art'>Articles</h1>
        <p className='p1'>Welcome to hundreds of the best articles on self-improvement, productivity, relationships, and living a better life. You can browse the articles by topic, by date, or search by keyword below.</p>
      </div>
    </div>
  )
}

export default Home
