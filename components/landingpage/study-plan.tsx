"use client";

import { LocateIcon } from "lucide-react";
import { PinContainer } from "@/components/sub/3d-pin";
import {studyplan} from "@/constants/index"

const StudyPlan = () => {
  return (
    <div className="py-20 bg-[#0f0d13]" id="study-plans">
      <h1 className=" text-3xl md:text-5xl font-bold text-center text-white">
  Your Ultimate <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">Study Plans</span> & <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">Roadmaps</span>  🚀
</h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-2">
        {studyplan.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title={item.title}
              href={`/dashboard/track/${item.t_id}`}
            >
              <div className="flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src={item.img} alt="bgimg" />
                </div>
                
              </div>

              <h1 className="font-semibold lg:text-[20px] md:text-xl text-base line-clamp-1 text-white">
                {item.title}
              </h1>

              <p
                className="lg:text-[16px] lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#FFFFFFCC",
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
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-[#b5b5f6]">
                    Read
                  </p>
                  <LocateIcon className="ms-3" color="#b5b5f6" />
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