'use client';

import MenuBar from "@/components/menu-bar";
import Image from "next/image";

export default function Home() {
  // 
  // blur-3xl
  return (
    <div className="bg-light-blue isolate relative overflow-clip grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <div aria-hidden="true" className="absolute top-[-20rem] -z-10 blur-3xl transform-gpu sm:ml-16 sm:translate-x-0 sm:transform-gpu">
          <div
            style={{
              clipPath:
                'polygon(50% 0%, 65% 8%, 78% 5%, 88% 18%, 98% 35%, 90% 50%, 85% 65%, 70% 75%, 55% 88%, 40% 75%, 28% 85%, 15% 70%, 5% 52%, 12% 35%, 20% 22%, 35% 15%, 45% 5%)'
                // 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-100"
          />
  
        </div>
        <div aria-hidden="true" className="absolute -z-10 top-[30rem] blur-3xl transform-gpu sm:ml-16 sm:translate-x-0 sm:transform-gpu">
          <div
            style={{
              clipPath: 'polygon(8% 82%, 73% 32%, 43% 91%, 15% 55%)',
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-100"
          />
  
        </div>


      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello, world!
      </main>
      <MenuBar activeButton={"home"}/>
    </div>
  );
}
