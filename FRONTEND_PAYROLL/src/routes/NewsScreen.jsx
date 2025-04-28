import { NewsTable } from '@/components/newsPayrollComponents/NewsTable'
import React from 'react'

export const NewsScreen = () => {
  return (
    <>
      <h1 className='text-4xl font-bold p-8'>Todas las novedades de nominas</h1>
      <NewsTable />
    </>
  )
}
