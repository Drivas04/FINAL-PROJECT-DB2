import { Button } from '@/components/ui/button'
import React from 'react'

export const LogoutComponent = () => {

    const onClick = () => {
        localStorage.removeItem("userSession");
    }

  return (
    <Button variant="destructive" onClick={() => onClick()}>Cerrar sesión</Button>
  )
}
