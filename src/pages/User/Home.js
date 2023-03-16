import React from 'react'
import Navbar from '../../components/User/Navbar/index'
import Dashboard from '../../components/User/Home/Dashboard'
import bannerImage from '../../asset/banner.jpg'

function Home() {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <h1 className='text-center m-auto'>this is homw page</h1>
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={bannerImage} alt="Banner" className="h-full min-w-full object-center" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center px-4 py-2 bg-gray-800 bg-opacity-75 rounded-md">
            Your Banner Title Here
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Home