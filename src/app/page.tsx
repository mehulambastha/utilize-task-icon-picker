import React from 'react'
import PickerParentComp from './components/PickerParentComp'

const Page = () => {
  return (
    <div className='text-white max-w-[768px] my-auto bg-primary-dark w-full h-[calc(100vh-100px)] rounded-3xl flex flex-col items-center text-center py-10 justify-center'>
      <h1 className='text-3xl my-5 font-bold'>
        <span className='text-accent font-extrabold'>Icon</span> Picker
      </h1>
      <PickerParentComp />
    </div>
  )
}

export default Page
