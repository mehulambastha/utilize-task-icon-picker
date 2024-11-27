type propsForIconsPerPage = {
  pageWidth: number,
  pageHeight: number,
  iconWidth: number,
  iconHeight: number,
  gap?: number
}

export const calculateNumberOfIconsPerPage = ({
  pageWidth,
  pageHeight,
  iconWidth,
  iconHeight,
  gap = 0
}: propsForIconsPerPage): number => {
  let columns = Math.floor((pageWidth - 40) / (iconWidth + gap))
  const remCol = (pageWidth - 40) % (iconWidth + gap)
  if (remCol >= iconWidth) {
    columns += 1
  }

  let rows = Math.floor((pageHeight - 80) / (iconHeight + gap))
  const remRow = (pageHeight - 80) % (iconHeight + gap)
  if (remRow >= iconWidth) {
    rows += 1
  }

  return columns * rows
}
