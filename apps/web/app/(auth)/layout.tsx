import React from 'react'
import Background from '../../component/Background'
import Navbar from '../../component/Navbar'

function layout({children}:{children:React.ReactNode}) {
  return (
    <Background>
        <Navbar/>
        {children}
    </Background>
  )
}

export default layout