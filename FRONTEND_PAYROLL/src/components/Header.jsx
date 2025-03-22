import React from 'react'

export const Header = () => {
  return (
    <header className='bg-gray-200 fixed top-0 w-full py-4 px-6 border-b border-gray-300 shadow-md'>
      <img className='absolute' src="src\assets\logo-rh.png" alt="logo" width="120px" height="120px"/>
        <h1 className='text-4xl font-semibold text-gray-800 p-8 ml-32'>Aplicación de Recursos Humanos</h1>
    </header>
  )
}
