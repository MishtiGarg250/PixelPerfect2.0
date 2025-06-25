"use client"

import React from 'react'
import Image from 'next/image';

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
}

const SkillDataProvider = ({ src, width, height, index} : Props) => {
  return (
    <div className="text-white bg-[#201f24] backdrop-blur-sm rounded-[10px] md:rounded-2xl p-[4px] md:p-1 w-[56px] md:w-auto">
      <Image
      src={src}
      width={width}
      height={height}
      alt='skill image'
      />
    </div>
  )
}

export default SkillDataProvider