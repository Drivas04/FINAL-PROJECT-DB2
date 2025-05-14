import { ContractsTable } from '@/components/contractsComponents/ContractsTable'
import React from 'react'

export const ContractsScreen = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 overflow-x-auto">
      <ContractsTable/>
    </div>
  )
}
