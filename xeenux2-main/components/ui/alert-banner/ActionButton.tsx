"use client";

interface ActionButtonProps {
  onClick: () => void;
}

export function ActionButton({ onClick }: ActionButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="bg-white text-black text-sm md:text-md font-black px-12 py-3 rounded-full
          shadow-[0_4px_8px_rgba(0,0,0,0.2)]
          hover:bg-gray-100 transition-all duration-300 transform hover:scale-105
          [text-shadow:_1px_1px_0_rgb(255_255_255)]"
      >
        JOIN NOW
      </button>
    </div>
  );
}