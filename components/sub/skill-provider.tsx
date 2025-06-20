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
    <div className="text-white">
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