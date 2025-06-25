import { FaLocationArrow,FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa6";
import MagicButton from "@/components/sub/MagicButton";



const Footer = () => {
  return (
    <footer className="px-6 py-6 w-full md:pt-10 md:pb-10 text-white bg-gradient-to-r from-[#0f0d13] via-[#201f24] to-[#0f0d13] border-t border-[#48454e] md:px-12 shadow-2xl backdrop-blur-sm" id="contact">
      <div className="flex flex-col">
        <h1 className="text-[24px] md:text-4xl font-bold text-gray-200 lg:max-w-[45vw] leading-tight">
          Want us to take your <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">Digital Presence</span> to the next level?
        </h1>
        <a href="mailto:pixelperfect317@gmail.com" className="mt-6">
          <MagicButton
            title="Let's get in touch!"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-12 md:flex-row flex-col justify-between items-center mx-auto">
        <p className="text-[#cbc4cf] text-sm md:text-base">
          &copy; 2025 <span className="text-[#d2bcfd]">Pixel Perfect</span> | All Rights Reserved
        </p>

        <div className="pt-6 flex items-center gap-5">
          
            <a href="https://www.youtube.com/@cute_Flame" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-opacity-20 backdrop-blur-md border border-[#f0b7c5] hover:bg-[#d2bcfd] hover:border-[#d2bcfd] transition-all duration-300 cursor-pointer">
                <FaYoutube className="w-6 h-6 filter brightness-90 text-[#f0b7c5] hover:text-[#38265c]" />
              </div>
            </a>
            <a href="https://www.linkedin.com/company/its-pixelperfect" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-opacity-20 backdrop-blur-md border border-[#f0b7c5] hover:bg-[#d2bcfd] hover:border-[#d2bcfd] transition-all duration-300 cursor-pointer">
                <FaLinkedin className="w-6 h-6 filter brightness-90 text-[#f0b7c5] hover:text-[#38265c]" />
              </div>
            </a>
            <a href="https://github.com/Aryan9059" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-opacity-20 backdrop-blur-md border border-[#f0b7c5] hover:bg-[#d2bcfd] hover:border-[#d2bcfd] transition-all duration-300 cursor-pointer">
                <FaGithub className="w-6 h-6 filter brightness-90 text-[#f0b7c5] hover:text-[#38265c]" />
              </div>
            </a>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;