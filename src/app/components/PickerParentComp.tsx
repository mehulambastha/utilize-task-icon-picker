'use client'
import React, { useState } from 'react'
import IconPicker from './IconPicker'
import Image from 'next/image'

const PickerParentComp = () => {
  const [showPicker, setShowPicker] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<null | string>(null)
  return (

    <div>
      <h1 className='font-bold text-center my-5 text-gray-100 text-lg'>
        Select a <u className='text-accent'>beautiful</u> feather icon!
      </h1>
      {
        showPicker &&
        <IconPicker rowsInOnePage={2} columnsInOnePage={2} iconHeight={50} iconWidth={50} pickerWidth={600} pickerHeight={500} setCurrentIcon={setSelectedIcon} setDisplayStatus={setShowPicker} />
      }

      {
        !showPicker &&
        <div className=' flex items-center justify-center gap-5'>
          <button onClick={() => setShowPicker(true)} className='my-5 px-5 py-3 bg-accent text-black shadow-lg hover:scale-105 rounded-xl duration-150'>
            {
              selectedIcon ? <Image src={selectedIcon} width={50} height={50} alt={`icon-${selectedIcon}`} /> : 'Launch'
            }
          </button>
          {
            selectedIcon && (
              <button onClick={() => setSelectedIcon(null)} className='text-white py-1 px-3 text-lg bg-red-500 rounded-full'>
                clear
              </button>
            )
          }

        </div>
      }
      {
        selectedIcon && (
          <p className='underline-offset-3 underline'>
            {selectedIcon.split('/')[3]}
          </p>
        )
      }

    </div >
  )
}

export default PickerParentComp
