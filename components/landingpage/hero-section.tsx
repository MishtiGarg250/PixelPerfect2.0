import React from "react";
import { SparklesIcon } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative flex items-center flex-row bg-[#0d0d0d] h-full w-full " id="about-me">
      <div className="h-screen flex flex-row items-center justify-center px-20 w-full z-[20]">
      <div className="w-screen flex flex-col gap-5 text-start">
        <div className="Welcome-box mt-[-10px] pt-[10px] pb-[14px] pl-[12px] pr-[20px] border border-[#b5b5f6]/10">
          <SparklesIcon className="text-[#f7bff4] mr-[10px] h-5 w-5" />
          <h1 className="text-white text-[13px]">
            Join the Revolution of Pixel Perfect coding!
          </h1>
        </div>

        <div className="flex flex-col gap-6 mt-6 text-6xl font-semibold text-white max-w-[700px] w-auto h-auto">
          <span className="text-[36px]">
            We are team
            <span className="text-[60px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4]">
              {" "}<br />
              Pixel Perfect{" "}
            </span>
          </span>
        </div>

        <p className="text-lg text-white/80 my-5 max-w-[1000px]">
          We are a passionate team of developers, designers and innovators. We love to build, break, and innovate with cutting-edge technology.
        </p>
        <a className="py-2 button-primary text-center text-black cursor-pointer rounded-lg max-w-[200px]">
          Learn More
        </a>
      </div>

      <div className="w-full h-full flex justify-end items-center">
        <Image
          src="/hero_image.png"
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