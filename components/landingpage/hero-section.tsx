import React from "react";
import { SparklesIcon } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="relative flex items-center flex-row bg-[#141318] w-full "
      id="about-me"
    >
      <div className="md:py-20 flex flex-row items-center justify-center py-8 px-6 md:px-20 w-full z-[20]">
        <div className="w-screen flex flex-col gap-5 text-start">
          <div className="Welcome-box mt-[-10px] pt-[14px] pb-[14px] pl-[20px] pr-[24px] border border-[#b5b5f6]/10">
            <SparklesIcon className="text-[#f7bff4] mr-[16px] h-5 w-5" />
            <h1 className="text-white text-[10px] md:text-[13px]">
              Crafting Perfect Apps for your Daily Pixels 😉!
            </h1>
          </div>

          <div className="flex flex-col gap-6 md:mt-6 font-medium text-[#e6e1e9] max-w-[700px] w-auto h-auto">
            <span className="md:text-[32px] text-[20px]">
              We are team
              <span className="text-[40px] md:text-[64px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] leading-tight">
                {" "}
                <br />
                Pixel Perfect{" "}
              </span>
            </span>
          </div>

          <p className="md:text-lg text-[16px] text-[#e6e1e9] mt-[-8px] md:mt-0 md:mb-10 mb-4 max-w-[1000px]">
            We specialize in creating stunning applications with meticulous
            attention to detail. Our team transforms your vision into
            pixel-perfect reality using cutting-edge technologies and modern
            design principles.
          </p>
          <a
            href="#study-plans"
            className="py-3 px-6 button-primary text-center text-black cursor-pointer rounded-full w-fit"
          >
            Explore our Roadmaps
          </a>
        </div>

        <div className="w-full h-full justify-end items-center hidden md:flex">
          <Image
            src="/navbar.png"
            alt="work icons"
            height={500}
            width={500}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
