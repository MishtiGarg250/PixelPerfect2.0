import { LucideClock } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#141318] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <LucideClock className="w-30 h-30 text-[#e6e1e9] mx-auto mb-8" />
          <h1 className="text-3xl md:text-8xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text mb-4">
            Comin' Soon
          </h1>
          <p className="text-lg md:text-2xl px-12 md:px-0 text-[#cac4cf] mb-8 md:mb-16">
            Something amazing is on the way. Stay tuned!
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-[#cbc3dc] rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-[#cbc3dc] rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#cbc3dc] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
