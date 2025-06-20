import { FaLocationArrow,FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa6";
import MagicButton from "@/components/sub/MagicButton";



const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 text-white bg-black border-t pl-10 pr-10 border-gray-800" id="contact">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-200 lg:max-w-[45vw] leading-tight">
          Ready to take your <span className="text-[#b5b5f6]">digital presence</span> to the next level?
        </h1>
        <p className="text-white/80 md:mt-6 mt-4 max-w-[600px]">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:pixelperfect317@gmail.com" className="mt-6">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center px-6 md:px-12 mx-auto">
        <p className="text-white/60 text-sm md:text-base">
          &copy; 2025 <span className="text-[#b5b5f6]">Pixel Perfect</span> | All Rights Reserved
        </p>

        <div className="pt-6 flex items-center gap-5">
          
            <a href="https://www.youtube.com/@cute_Flame" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-opacity-20 backdrop-blur-md border border-[#b5b5f6] hover:bg-[#f7bff4] transition-all duration-300 cursor-pointer">
                <FaYoutube className="w-6 h-6 filter brightness-90 text-[#b5b5f6]" />
              </div>
            </a>
            <a href="https://www.linkedin.com/company/its-pixelperfect" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-opacity-20 backdrop-blur-md border border-[#b5b5f6] hover:bg-[#f7bff4] transition-all duration-300 cursor-pointer">
                <FaLinkedin className="w-6 h-6 filter brightness-90 text-[#b5b5f6]" />
              </div>
            </a>
            <a href="https://github.com/Aryan9059" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-opacity-20 backdrop-blur-md border border-[#b5b5f6] hover:bg-[#f7bff4] transition-all duration-300 cursor-pointer">
                <FaGithub className="w-6 h-6 filter brightness-90 text-[#b5b5f6]" />
              </div>
            </a>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;