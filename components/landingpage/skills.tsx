import React from 'react'
import SkillText from '@/components/sub/skill-text'
import { Skill_data ,skill_data2,skill_data3} from '@/constants/index'
import SkillDataProvider from '@/components/sub/skill-provider'

const Skills = () => {
  return (
    <section id="skills" style={{transform: "scale(0.9)"}} className="flex flex-col items-center justify-center gap-3 relative overflow-hidden py-20">
      <SkillText/>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
      {Skill_data.map((image,index)=>(
        <SkillDataProvider
        key={index}
        width={image.width}
        height={image.height}
        index={index}
        src={image.Image}

        />
      ))}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
      {skill_data2.map((image,index)=>(
        <SkillDataProvider
        key={index}
        width={image.width}
        height={image.height}
        index={index}
        src={image.Image}

        />
      ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
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
      
      </div>
      
    </section>
  )
}

export default Skills
