"use client";

export function Logo() {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-black/80 rounded-sm transform rotate-3" />
                ))}
              </div>
            </div>
            <div className="text-black font-bold">
              <div className="text-xl">UNIVERSE</div>
              <div className="text-sm">Blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}