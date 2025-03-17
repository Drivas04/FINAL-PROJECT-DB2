import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex flex-wrap gap-4 mx- auto'>
      <div>Gestion de empleados</div>
      <div>Liquidacion de seguro social</div>
      <div>Liquidacion de nomina</div>
      <div>Liquidacion de cesantias</div>
    </header>
  )
}

export default Header