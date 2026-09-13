import React from 'react'
import Title from './Title'

const HomeBanner = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Title className='text-3 md:text-4xl uppercase font-bold text-center'>Best Clothing Collection</Title>
      <p className='text-sm text-lightColor/80 font-medium text-center max-w-120'>
        Find everything you need to look and feel your best, and shope the latest men&apos;s fashion and lifestyle products from the best brands in the world.
      </p>
    </div>
  )
}

export default HomeBanner
