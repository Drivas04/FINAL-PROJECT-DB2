import { NewsTable } from '@/components/newsPayrollComponents/NewsTable'
import React from 'react'

export const NewsScreen = () => {
  return (
    <>
      <h1 className='text-2xl md:text-4xl font-bold p-4 md:p-8'>Todas las novedades de nóminas</h1>
      <div className="px-4 md:px-6">
        <NewsTable />
      </div>
    </>
  )
}
