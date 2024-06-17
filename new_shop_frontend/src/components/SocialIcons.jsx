import React from 'react'
import { RiInstagramFill, RiLinkedinFill, RiTwitterFill, RiYoutubeFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
      <Link to={''} className='text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration 500'><RiTwitterFill /></Link>
      <Link to={''} className='text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration 500'><RiInstagramFill /></Link>
      <Link to={''} className='text-[#ff2e63] text-2xl hover:-translate-y-1 transition-all duration 500'><RiYoutubeFill /></Link>
      <Link to={''} className='text-[#f9ed69] text-2xl hover:-translate-y-1 transition-all duration 500'><RiLinkedinFill /></Link>
    </div>
  )
}

export default SocialIcons