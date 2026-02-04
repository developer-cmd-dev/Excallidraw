import React from 'react'
import Background from '../../component/Background'
import Navbar from '../../component/Navbar'

function layout({children}:{children:React.ReactNode}) {
  return (
    <Background>
        <Navbar/>
        <div className="w-full min-h-[calc(100vh-12vh)]  flex items-center justify-center px-4 sm:px-8 py-4">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex justify-center items-center">
            {children}
          </div>
        </div>
    </Background>
  )
}

export default layout