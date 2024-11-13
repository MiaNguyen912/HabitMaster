'use client';
import Image from "next/image";
import GoBackHeader from "@/components/goback-header";



export default function AddActivity() {
  return (
    <div className="bg-light-blue relative isolate overflow-clip min-h-screen">
        {/* paralax background decor*/}
        <div className="fixed -z-10">
            <div aria-hidden="true" className="absolute top-[-30rem] left-[25vw] blur-3xl transform-gpu">
                <div
                    style={{clipPath: 'polygon(50% 0%, 65% 8%, 78% 5%, 88% 18%, 98% 35%, 90% 50%, 85% 65%, 70% 75%, 55% 88%, 40% 75%, 28% 85%, 15% 70%, 5% 52%, 12% 35%, 20% 22%, 35% 15%, 45% 5%)'}}
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-80"
                />
            </div>
            <div aria-hidden="true" className="absolute top-[10rem] left-[10vw] blur-3xl transform-gpu">
                <div
                    style={{clipPath: 'polygon(8% 82%, 73% 32%, 43% 91%, 15% 55%)',}}
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-80"
                />
            </div>
        </div>

        {/* main content */}
        <div>
          <GoBackHeader/>

          {/* create activity form */}
          <div className="flex items-center justify-around h-screen">
            <form className="p-6 bg-secondary/90 rounded-2xl">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">Activity Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
             
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">Date</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">Duration</label>
                <input type="time" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">Category</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                  <option>Category 4</option>
                </select>
              </div>
             {/* remind me button */}
              <div className="space-y-2">
                <button className="w-full py-2 text-white bg-blue-500 rounded-md">Remind Me</button>
              </div>
              
              {/* create button */}
              <div className="space-y-2">
                <button className="w-full py-2 text-white bg-blue-500 rounded-md">Create Activity</button>
              </div>
            </form>
          </div>

        </div>



    </div>
  );
}
