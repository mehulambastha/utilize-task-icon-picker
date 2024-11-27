import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";

export async function GET() {
  const iconsPath = path.join(process.cwd(), 'public', 'icons', 'feather');

  try {
    const icons = fs.readdirSync(iconsPath);

    const iconsRoutes = icons
      .filter(icon => icon.endsWith('.svg'))
      .map(icon => `/icons/feather/${icon}`);

    return NextResponse.json({
      icons: iconsRoutes
    })
  } catch (error) {
    console.error('Error fetching the icons: ', error);

    return NextResponse.json(
      { error: "Failed to fetch icons." },
      { status: 500 }
    )
  };

}
