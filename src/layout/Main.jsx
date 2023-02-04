import React from 'react'

const Main = ({children}) => {
  return (
    <main className='pt-[50px] w-[100%] h-[100vh] overflow-y-auto overflow-x-hidden bg-primary'>
      {children}
    </main>
  )
}

export default Main