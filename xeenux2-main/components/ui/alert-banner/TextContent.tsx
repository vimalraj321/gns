"use client";

interface TextContentProps {
  title: string;
  subtitle: string;
  details: string;
  details2: string;
}

export function TextContent({ title, subtitle, details, details2 }: TextContentProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className=" text-md md:text-2xl font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {title}
      </h2>
      <div className="space-y-4">
        <h3 className="text-sm md:text-md md:text-3xl font-black text-black 
          [text-shadow:_1px_1px_0_rgb(255_255_255),_-1px_-1px_0_rgb(255_255_255),_1px_-1px_0_rgb(255_255_255),_-1px_1px_0_rgb(255_255_255)]">
          {subtitle}
        </h3>
        <p className="text-sm  md:text-xl font-black text-black 
          [text-shadow:_1px_1px_0_rgb(255_255_255),_-1px_-1px_0_rgb(255_255_255),_1px_-1px_0_rgb(255_255_255),_-1px_1px_0_rgb(255_255_255)]">
          {details}
        </p>
        <p className="text-sm  md:text-xl font-black text-black 
          [text-shadow:_1px_1px_0_rgb(255_255_255),_-1px_-1px_0_rgb(255_255_255),_1px_-1px_0_rgb(255_255_255),_-1px_1px_0_rgb(255_255_255)]">
          {details2}
        </p>
      </div>
    </div>
  );
}