"use client"
import React from 'react'
import { SparklesIcon } from 'lucide-react'

const SkillText = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center gap-6'>
      <div className="Welcome-box py-[8px] px-[7px] border border-[#fa65bc8b] opacity-[0.9]">
        <SparklesIcon className="text-[#b5b5f6] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px] text-white">
          Our Tech stack
        </h1>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-center text-white mb-8">
        Explore the <span className="text-[#b5b5f6]">Tech Stack</span> behind <span className="text-[#b5b5f6]">Pixel Perfect</span>
      </h1>
    </div>
  )
}

export default SkillText