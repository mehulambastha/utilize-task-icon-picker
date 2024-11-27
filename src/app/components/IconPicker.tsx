import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { calculateNumberOfIconsPerPage } from '../util/helperFunctions'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type IconPickerProps = {
  rowsInOnePage?: number,
  columnsInOnePage?: number,
  iconHeight: number,
  iconWidth: number,
  pickerHeight: number,
  pickerWidth: number,
  setCurrentIcon: Dispatch<SetStateAction<string | null>>,
  setDisplayStatus: Dispatch<SetStateAction<boolean>>
}

const IconPicker = ({ iconWidth, iconHeight, pickerHeight = 500, pickerWidth = 500, setDisplayStatus, setCurrentIcon }: IconPickerProps) => {
  const [icons, setIcons] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [iconsPerPage, setIconcPerPage] = useState<number>(0)


  useEffect(() => {
    async function fetchIcons() {
      const res = await fetch('/api/icons')
      const data = await res.json()
      setIcons(data.icons)
    }
    fetchIcons()
  }, [])

  useEffect(() => {
    const calculateperPage = calculateNumberOfIconsPerPage({ pageWidth: pickerWidth, pageHeight: pickerHeight, iconWidth, iconHeight, gap: 10 })

    setIconcPerPage(calculateperPage)
  }, [pickerWidth, pickerHeight, iconWidth, iconHeight])

  const startIndex = currentPage * iconsPerPage
  const paginatedIcons = icons.slice(startIndex, startIndex + iconsPerPage)

  const handleNext = () => {
    if (startIndex + iconsPerPage < icons.length) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const toggleDisplayStatus = () => {
    setDisplayStatus(prev => !prev)
  }

  const handleIconSelect = (icon: string) => {
    setCurrentIcon(icon)
    toggleDisplayStatus()
  }

  return (
    <>
      <div
        className='px-5 py-10 rounded-sm flex flex-col items-center justify-start relative bg-primary-light'
        style={{
          height: pickerHeight,
          width: pickerWidth
        }}
      >
        <button
          className='absolute -top-2 -right-2 text-md text-white font-extrabold px-3 py-1 rounded-md bg-red-700'
          onClick={toggleDisplayStatus}
        >
          X
        </button>

        <div
          style={{
            gap: '10px'
          }}
          className='items-start flex flex-wrap justify-center'
        >
          {
            paginatedIcons.map((icon, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      style={{
                        width: iconWidth,
                        height: iconHeight
                      }}
                      className='hover:bg-accent hover:scale-125 duration-100 p-1 rounded-md'
                      onClick={() => handleIconSelect(icon)}
                    >
                      <Image width={iconWidth} height={iconHeight} src={`${icon}`} alt={`icon-${icon}-${index}`} className=' w-full h-full' />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className='mb-1'>
                    {icon.split('/')[3].split('.')[0]}
                  </TooltipContent>
                </Tooltip>

              </TooltipProvider>
            ))
          }

        </div>
        <div className='absolute flex gap-2 items-center left-1/2 text-secondary -translate-x-1/2 bottom-1'>
          <button onClick={handlePrevious} disabled={currentPage === 0} className='disabled:cursor-not-allowed font-extrabold text-2xl'>
            &lt;
          </button>
          <span className='font-bold text-xl'>
            {currentPage + 1}/{Math.ceil(icons.length / iconsPerPage)}
          </span>
          <button onClick={handleNext} disabled={currentPage + 1 === Math.ceil(icons.length / iconsPerPage)} className='disabled:cursor-not-allowed font-extrabold text-2xl'>
            &gt;
          </button>
        </div>
      </div>
    </>
  )
}

export default IconPicker
