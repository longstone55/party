import React from "react";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center select-none">
      <Image 
        src="https://jacksonparty.com/img/logo.png" 
        alt="JACKSON PARTY" 
        width={180} 
        height={60} 
        className="object-contain h-auto w-[120px] md:w-[180px]"
        priority
      />
    </div>
  );
};
