import React from "react";

export interface SwarohanaLogoProps {
  variant?: "vertical" | "horizontal" | "icon" | "card";
  className?: string;
  size?: number; // Controls the general height/width scaling
}

export const SwarohanaLogo: React.FC<SwarohanaLogoProps> = ({
  variant = "vertical",
  className = "",
  size = 40,
}) => {
  // Pure SVG representation of the stylized "S" graphic inside the yellow rounded box
  const renderSwarohanaIconSVG = (customSize?: number) => {
    const iconSize = customSize || size;
    return (
      <svg
        width={iconSize}
        height={(iconSize * 1.25)}
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
      >
        {/* Yellow rounded background */}
        <rect x="0" y="0" width="100" height="125" rx="18" fill="#F4C430" />
        
        {/* Stylized S Curve and Treble-Clef musical note elements in dark chocolate brown (#3E2723) */}
        <g fill="#3E2723">
          {/* Main swooping musical curve with spiral core */}
          <path d="M50 22C42 16 35 24 38 34C41 42 48 45 52 52C57 62 52 74 42 78C32 82 23 76 21 67C19 58 25 49 34 48C41 47 45 53 44 59C43 64 39 66 35 65C32 64 31 60 32 57C33 54 36 53 38 54C40 55 40 57 39 58C38 59 36 59 35 58C34 57 34 55 35 54C36 52 39 52 39 54C39 57 36 58 35 55C34 51 36 48 39 49C44 50 46 57 42 61C38 65 31 64 29 59C27 53 31 47 37 47C44 47 48 53 45 60C42 67 35 70 28 67C22 64 19 56 22 49C25 42 32 39 38 33C44 27 45 21 41 16C38 12 33 13 31 17L30 15C32 10 40 9 44 14C48 18 48 24 43 29C38 34 31 38 27 44C23 50 22 57 26 63C30 69 38 71 44 67C50 63 53 55 50 48C47 41 40 37 38 30C36 23 41 18 47 19C52 20 54 25 53 29L55 30C56 24 53 19 50 18C47 17 44 19 43 21Z" />
          
          {/* Left sweeping dynamic feather leaf accent */}
          <path d="M42 37C38 42 37 49 40 55C42 59 46 61 48 59C49 58 48 56 47 55C45 53 44 49 45 46C46 43 49 41 51 40C52 40 52 38 51 38C48 38 45 42 42 37Z" />
          
          {/* Top rhythmic dynamic head spiral accent */}
          <path d="M51 24C55 22 58 18 57 14C56 11 53 10 51 12C49 14 49 17 51 19C52 20 54 20 55 18C56 17 55 15 54 14C54 14 53 14 53 15C53 16 54 16 54 16C54 17 53 17 53 16C53 15 54 15 55 14C55 13 54 13 53 14Z" />
        </g>
      </svg>
    );
  };

  if (variant === "icon") {
    return renderSwarohanaIconSVG();
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3.5 group select-none ${className}`}>
        {renderSwarohanaIconSVG(size)}
        <div className="flex flex-col justify-center">
          <span className="font-heading font-black text-lg sm:text-xl tracking-[4px] text-gold uppercase leading-none">
            Swarohana
          </span>
          <span className="text-[9px] tracking-[2px] text-[#e8e0d5]/50 uppercase font-bold mt-1">
            Music Studio
          </span>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {renderSwarohanaIconSVG(22)}
        <span className="font-heading font-black text-[11px] tracking-[2px] text-[#e8e0d5] uppercase">
          Swarohana
        </span>
      </div>
    );
  }

  // DEFAULT: VERTICAL LOGO BRANDING BADGE (Matched with the attached image logo exactly!)
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`} style={{ width: size * 2.5 }}>
      {/* 1. Yellow Rounded Icon */}
      {renderSwarohanaIconSVG(size * 1.5)}

      {/* 2. Dark Brown horizontal rectangle with 'Swarohana' inside */}
      <div className="w-full bg-[#3E2723] border border-gold/25 py-2 px-3 mt-3.5 rounded-sm shadow-md flex items-center justify-center">
        <span className="font-serif font-bold text-white tracking-[2px] text-xs sm:text-sm uppercase leading-none" style={{ fontFamily: "Georgia, serif" }}>
          Swarohana
        </span>
      </div>

      {/* 3. Tall clean dark brown display font 'MUSIC STUDIO' */}
      <div className="mt-2 flex flex-col items-center">
        <span 
          className="font-sans font-black text-[#e8e0d5] tracking-[4px] sm:tracking-[5px] uppercase leading-none"
          style={{ fontSize: size * 0.35, letterSpacing: "5px" }}
        >
          Music Studio
        </span>
      </div>
    </div>
  );
};
