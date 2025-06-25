import React from 'react'
import SkillText from '@/components/sub/skill-text'
import { Skill_data ,skill_data2,skill_data3} from '@/constants/index'
import SkillDataProvider from '@/components/sub/skill-provider'

const Skills = () => {
  return (
    <section id="skills" className="flex flex-col items-center bg-[#0f0d13] justify-center gap-3 relative overflow-hidden px-6 py-6 md:py-20 md:px-20">
      <SkillText/>
      <div className="flex flex-row justify-center flex-wrap md:mt-[24px] gap-4 md:gap-8 items-center">
      {Skill_data.map((image,index)=>(
        <SkillDataProvider
        key={index}
        width={image.width}
        height={image.height}
        index={index}
        src={image.Image}

        />
      ))}
      {skill_data2.map((image,index)=>(
        <SkillDataProvider
        key={index}
        width={image.width}
        height={image.height}
        index={index}
        src={image.Image}

        />
      ))}
      {skill_data3.map((image,index)=>(
        <SkillDataProvider
        key={index}
        width={image.width}
        height={image.height}
        index={index}
        src={image.Image}

        />
      ))}
      </div>
    </section>
  )
}

export default Skills
