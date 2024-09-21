import React from 'react'
import Container from './Container'

const Loading = () => {
  return (
    <Container>

            
        <div className="bg-lightwhite h-20 mb-10 rounded-2xl animate-puls">
        </div>
        <div className=" grid grid-cols-2 gap-6">
            <div className="bg-lightwhite h-64 rounded-2xl animate-pulse ">
            </div>
            <div className="bg-lightwhite h-64 rounded-2xl animate-pulse ">
            </div>
            <div className="bg-lightwhite h-64 rounded-2xl animate-pulse ">
            </div>
            <div className="bg-lightwhite h-64 rounded-2xl animate-pulse ">
            </div>
        </div>
    </Container>
  )
}

export default Loading