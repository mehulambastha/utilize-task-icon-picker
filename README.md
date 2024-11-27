# Utilize Assignment Icon Picker

## What is the taks about?

A custom icon picker component created from scratch using Next.js, without relying on external or third-party components. The project uses Feather Icons downloaded and stored in the `public/icons/feather` directory.

### Install by cloning the repo, 
```
git clone https://github.com/mehulambastha/utilize-task-icon-picker.git
```

And then 
```bash
npm install
``` 
and then 
```
npm run dev
```

## Key Features and Design Choices

### Icon Sourcing
- Icons sourced from [Feather Icons](https://feathericons.com/)
- Stored in `public/icons/feather` directory
- Served via a custom Next.js backend route

### Backend Implementation

A custom API route dynamically serves SVG icons:

```typescript
export async function GET() {
  const iconsPath = path.join(process.cwd(), 'public', 'icons', 'feather');
  try {
    const icons = fs.readdirSync(iconsPath);
    const iconsRoutes = icons
      .filter(icon => icon.endsWith('.svg'))
      .map(icon => `/icons/feather/${icon}`);
    return NextResponse.json({ icons: iconsRoutes })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch icons." },
      { status: 500 }
    )
  }
}
```

### Icon Placement Calculation

Instead of using fixed `rowsPerPage` and `columnsPerPage` props, a dynamic calculation method was implemented:

```typescript
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
```

### Directory structure
```bash
├── public
│   ├── icons
│   │   └── feather
│   │       ├── [all the icons here].svg
├── README.md
├── src
│   ├── app
│   │   ├── api
│   │   │   └── icons
│   │   │       └── route.ts
│   │   ├── components
│   │   │   ├── IconPicker.tsx
│   │   │   └── PickerParentComp.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── util
│   │       └── helperFunctions.ts
│   ├── components
│   │   └── ui
│   │       └── tooltip.tsx
│   └── lib
│       └── utils.ts
```

### Design Rationale

My approach deviates from providing separate `rowsPerPage` and `columnsPerPage` props because the number of icons is already calculated based on:
- Picker height and width
- Icon dimensions
- Gaps between icons

### Additional Features

- Tooltip implementation showing icon names
- Modular code structure
- Responsive icon picker component

## Usage

```tsx
<IconPicker 
  iconWidth={32} 
  iconHeight={32} 
  pickerHeight={500} 
  pickerWidth={500} 
  setCurrentIcon={handleIconChange}
  setDisplayStatus={togglePicker}
/>
```

## Screenshots
![image](https://github.com/user-attachments/assets/a8e04954-b582-4151-81d9-f33bb8079712)



![image](https://github.com/user-attachments/assets/ba3e523f-4420-44af-834f-3f8dc71a8997)

### Pagination in action
![image](https://github.com/user-attachments/assets/653c8a6f-393a-4a26-8504-65abe4417ac1)


### After clicking on an icon
![image](https://github.com/user-attachments/assets/e1cd43db-1d2a-4a7f-bfe8-59dd8cf6d7e4)



