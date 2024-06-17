import React from 'react'

const ProductDesciption = () => {
  return (
    <div className='max-padd-container mt-20'>
      <div className='flex gap-3 mb-4'>
        <button className='btn-dark rounded-sm !text-xs !py-[6px] w-36'>Description</button>
        <button className='btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Care Guide</button>
        <button className='btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Size Guide</button>
      </div>
      <div className='flex flex-col pb-16'>
        <p className='text-sm'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium expedita laboriosam, nemo atque ipsum dicta sed voluptatibus dignissimos. Aliquam ad repellendus iure itaque tempora quod! Eos unde est dicta velit sed aut repellat doloribus nisi sequi voluptate doloremque, dolores similique.
        </p>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, repudiandae. Nihil vitae consequuntur, magnam cumque perspiciatis cupiditate. Dignissimos, inventore error.
        </p>
      </div>
    </div>
  )
}

export default ProductDesciption