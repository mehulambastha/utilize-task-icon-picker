'use client'
import React, { useEffect, useState } from 'react'
import IconPicker from './IconPicker'
import Image from 'next/image'
import Input from '@/components/custom/input'

const PickerParentComp = () => {
  const [showPicker, setShowPicker] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<null | string>(null)
  const [savedData, setSavedData] = useState(false)
  const [iconWidth, setIconWidth] = useState(0)
  const [iconHeight, setIconHeight] = useState(0)
  const [pickerWidth, setPickerWidth] = useState(0)
  const [pickerHeight, setPickerHeight] = useState(0)
  const [dataValid, setDataValid] = useState(false)



  useEffect(() => {
    if (iconWidth > 0 && iconHeight > 0 && pickerHeight > 200 && pickerWidth > 200) {
      setDataValid(true)
    } else {
      setDataValid(false)
    }

  }, [iconWidth, iconHeight, pickerWidth, pickerHeight])

  const handleSubmit = () => {
    if (dataValid) {
      setSavedData(true)
    }
  }

  const handleClear = () => {
    setSelectedIcon(null)
    setSavedData(false)
  }

  return (

    <div>
      <h1 className='font-bold text-center my-5 text-gray-100 text-lg'>
        Select a <u className='text-accent'>beautiful</u> feather icon!
      </h1>
      {
        !savedData && (
          <div className='max-w-screen-sm w-full flex flex-col items-center justify-center gap-2'>
            <Input type='number' placeholder='Icon Width' onChange={(e) => setIconWidth(parseInt(e.target.value))} />
            <Input type='number' placeholder='Icon Height' onChange={(e) => setIconHeight(parseInt(e.target.value))} />
            <Input type='number' placeholder='Picker height (>200)' onChange={(e) => setPickerWidth(parseInt(e.target.value))} />
            <Input type='number' placeholder='Picker Width (>200)' onChange={(e) => setPickerHeight(parseInt(e.target.value))} />
            <button disabled={!dataValid} onClick={handleSubmit} className={`bg-primary-light disabled:cursor-not-allowed disabled:text-gray-400 max-w-48 w-full duration-150 text-secondary py-3 rounded-full ${dataValid && 'hover:scale-110'}`}>
              Let's go!
            </button>
          </div>
        )
      }

      {
        showPicker &&
        <IconPicker rowsInOnePage={2} columnsInOnePage={2} iconHeight={iconHeight} iconWidth={iconWidth} pickerWidth={pickerWidth} pickerHeight={pickerHeight} setCurrentIcon={setSelectedIcon} setDisplayStatus={setShowPicker} />
      }

      {
        !showPicker && savedData &&
        <div className=' flex items-center justify-center gap-5'>
          <button onClick={() => setShowPicker(true)} className='my-5 px-5 py-3 bg-accent text-black shadow-lg hover:scale-105 rounded-xl duration-150'>
            {
              selectedIcon ? <Image src={selectedIcon} width={50} height={50} alt={`icon-${selectedIcon}`} /> : 'Launch'
            }
          </button>
          {
            selectedIcon && (
              <button onClick={handleClear} className='text-white py-1 px-3 text-lg bg-red-500 rounded-full'>
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
