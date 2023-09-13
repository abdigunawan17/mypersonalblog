import React, { ReactNode } from 'react'

const PaddingContainer = ({children}: { children:ReactNode }) => {
  return (
    <div className='px-8 w-full mx-auto max-w-7xl'>
        {children}
    </div>
  )
}

export default PaddingContainer