import React from "react";
import { SparklesIcon } from "lucide-react";
import PixelBlast from "./PixelBlast";

const Hero = () => {
  return (
    <div
      className="relative flex justify-center bg-[#141318] w-full min-h-[600px] md:min-h-screen overflow-hidden"
      id="about-me"
    >
      <div
        style={{
          width: "100%",
          height: "135%",
          position: "absolute",
          top: -250,
          left: 0,
          zIndex: 10,
        }}
      >
        <PixelBlast
          variant="square"
          pixelSize={6}
          color="#454545"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.5}
          transparent
        />
        <div
          aria-hidden
          style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "35%",
        pointerEvents: "none",
        zIndex: 11,
        background:
          "linear-gradient(to bottom, rgba(20,19,24,0) 0%, rgba(20,19,24,1) 100%)",
          }}
        />
      </div>

      <div className="relative flex justify-center items-center pt-24 md:pt-32 pb-20 px-6 md:px-20 w-full z-[20]">
        <div className="w-full max-w-4xl flex flex-col gap-6 text-center items-center">
          
          <div className="Welcome-box py-3 px-6 border border-[#b5b5f6]/10 flex flex-row items-center justify-center w-fit rounded-full bg-white/5 backdrop-blur-sm">
            <SparklesIcon className="text-[#f7bff4] mr-3 h-5 w-5 flex-shrink-0" />
            <h1 className="text-white text-[10px] md:text-[13px] font-medium">
              Crafting Perfect Apps for your Daily Pixels 😉!
            </h1>
          </div>

          <div className="flex flex-col gap-6 md:mt-6 font-medium text-[#e6e1e9] w-auto h-auto">
            <span className="md:text-[32px] text-[20px]">
              We are team
              <span className="text-[40px] md:text-[64px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] leading-tight">
                {" "}
                <br />
                Pixel Perfect{" "}
              </span>
            </span>
          </div>

          <p className="md:text-lg text-[16px] text-[#e6e1e9] md:mb-8 mb-4 max-w-[700px]">
            We specialize in creating stunning applications with meticulous
            attention to detail. Our team transforms your vision into
            pixel-perfect reality using cutting-edge technologies and modern
            design principles.
          </p>
          
          <a
            href="#study-plans"
            className="py-3 px-6 button-primary text-center text-black cursor-pointer rounded-full w-fit"
          >
            Explore our Resources
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

