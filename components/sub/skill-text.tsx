"use client";
import React from "react";
import { SparklesIcon } from "lucide-react";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-6">
      <div className="hidden md:flex">
        <div className="Welcome-box mt-[-10px] pt-[14px] pb-[14px] mb-4 pl-[20px] pr-[24px] border border-[#b5b5f6]/10">
          <SparklesIcon className="text-[#f7bff4] mr-[16px] h-5 w-5" />
          <h1 className="text-white text-[13px]">Our Tech Stack 🧑‍💻</h1>
        </div>
      </div>

      <h1 className="text-[30px] md:text-5xl font-bold md:text-center text-white mb-8">
        Explore the{" "}
        <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">
          Tech Stack
        </span>{" "}
        behind{" "}
        <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">
          Pixel Perfect
        </span>
      </h1>
    </div>
  );
};

export default SkillText;
