"use client";

import { ArrowRightIcon } from "lucide-react";
import { PinContainer } from "@/components/sub/3d-pin";
import {studyplan} from "@/constants/index"

const StudyPlan = () => {
  return (
    <div className="md:py-20 py-8 bg-[#0f0d13]" id="study-plans">
      <h1 className="text-[30px] md:text-5xl px-6 md:px-0 font-bold md:text-center text-white">
  Your Ultimate <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">Study Plans</span> & <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">Roadmaps</span>  🚀
</h1>
      <div className="flex flex-wrap items-center justify-center p-4 md:gap-18 md:mt-2">
        {studyplan.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title={item.title}
              href={`/dashboard/track/${item.t_id}`}
            >
              <div className="flex items-center justify-center sm:w-96 w-[80vw] md:mt-[-8px] overflow-hidden h-[20vh] lg:h-[30vh] mb-4">
                <div
                  className="relative overflow-hidden rounded-3xl aspect-video"
                  style={{ backgroundColor: "#151218" }}
                >
                  <img src={item.img} alt="bgimg" className=" border-[#36343a]"/>
                </div>
                
              </div>

              <h1 className="lg:text-[20px] md:text-xl text-base line-clamp-1 text-[#e7e0e8]">
                {item.title}
              </h1>

              <p
                className="lg:text-[16px] lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#cbc4cf",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-[#49454e] rounded-full bg-[#151218] lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-[#f0b7c5]">
                    Read
                  </p>
                  <ArrowRightIcon className="ms-3" color="#f0b7c5" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlan;