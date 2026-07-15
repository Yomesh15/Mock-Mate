import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Capability from '../components/Capability'
import Modes from '../components/Modes'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="w-20 sm:w-32 md:w-40 h-1 bg-green-500 rounded-full mx-auto my-20"></div>
      <Steps />
      <div className="w-20 sm:w-32 md:w-40 h-1 bg-green-500 rounded-full mx-auto my-20"></div>
      <Capability />
      <div className="w-20 sm:w-32 md:w-40 h-1 bg-green-500 rounded-full mx-auto my-20"></div>
      <Modes />
      <div className="w-20 sm:w-32 md:w-40 h-1 bg-green-500 rounded-full mx-auto my-20"></div>
      <Footer />
    </>
  )
}

export default Home