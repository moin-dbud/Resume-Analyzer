import React from 'react'
import Hero from '../components/Hero'
import Navabr from '../components/Navbar'
import Upload from '../components/Upload'
import HowItWorks from '../components/HowItWorks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navabr/>
      <Hero/>
      <Upload/>
      <HowItWorks/>
      <section id='contact'>
      <Contact/>
      </section>
      <Footer/>
    </div>
  )
}

export default Home
