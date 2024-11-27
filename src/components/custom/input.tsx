import React from 'react'

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className='rounded-sm px-2 py-2 text-secondary bg-blue-200 focus:outline-none focus:border-none active:shadow-inner' />
  )
}

export default Input
