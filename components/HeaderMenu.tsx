"use client";

import { CATEGORIES_QUERY_RESULT } from '@/sanity.types';
import { headerData } from '../constants/index'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react';
const HeaderMenu = ({categories}: {categories: CATEGORIES_QUERY_RESULT}) => {
  const pathname = usePathname();
  return (
    <div className='hidden md:inline-flex w-1/3 items-center gap-3 text-sm capitalize font-semibold'>
      <Link href={`/`}
          className={`hover:text-darkColor transition-all duration-300 ease-in-out group relative ${pathname === `/` ? "text-darkColor" : "text-lightColor"}`}>
            Home
            <span className={` absolute ${pathname === `/` && "w-1/2" } w-0 -bottom-0.5 left-1/2 h-0.5 hoverEffect group-hover:w-1/2 group-hover:left-0 bg-darkColor`}/>
            <span className={` absolute ${pathname === `/` && "w-1/2" } w-0 -bottom-0.5 right-1/2 h-0.5 hoverEffect group-hover:w-1/2 group-hover:right-0 bg-darkColor`}/>
          </Link>
      {
        categories.map((item)=>(
          <Link key={item?.title} href={`/categories/${item?.slug?.current}`}
          className={`hover:text-darkColor transition-all duration-300 ease-in-out group relative ${pathname === `/categories/${item?.slug?.current}` ? "text-darkColor" : "text-lightColor"}`}>
            {item?.title} 
            <span className={` absolute ${pathname === `/categories/${item?.slug?.current}` && "w-1/2" } w-0 -bottom-0.5 left-1/2 h-0.5 hoverEffect group-hover:w-1/2 group-hover:left-0 bg-darkColor`}/>
            <span className={` absolute ${pathname === `/categories/${item?.slug?.current}` && "w-1/2" } w-0 -bottom-0.5 right-1/2 h-0.5 hoverEffect group-hover:w-1/2 group-hover:right-0 bg-darkColor`}/>
          </Link>
        ))
      }
    </div>
  )
}

export default HeaderMenu
