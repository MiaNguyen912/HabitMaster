'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from "@/components/menu-bar";
import GoBackHeader from "@/components/goback-header";
import { ChevronDownIcon } from '@heroicons/react/16/solid'





export default function Profile() {
    
    useEffect(() => {
        async function fetchData() {
          try {
           
          } catch (error) {
          }
        }
       
        fetchData();
    }, []);  

    function handleSignOut() {
      alert("sign out");
        // localStorage.removeItem("currentUser");
        // window.location.href = "/";
    } 

    function handleInfoUpdate(event) {
        event.preventDefault();
        alert("update info");

    }
    
   
    return (
        <div className="bg-light-blue relative isolate overflow-clip">
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

            {/* header */}
            <GoBackHeader text="Home"/>
            
            {/* main content */}
            <div className="flex flex-col items-center justify-center bg-gray-800 h-screen overflow-scroll ">        
              <form className="pt-20 max-sm:pt-40 mb-40" onSubmit={handleInfoUpdate}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                    <div>
                      <button type="button" className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20" >
                        Change avatar
                      </button>
                      <p className="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="current-password" className="block text-sm/6 font-medium text-white">
                      Current password
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="new-password" className="block text-sm/6 font-medium text-white">
                      New password
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-white">
                      Confirm password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4 w-full">
                  <button type="submit" className="rounded-md bg-primary w-[50%] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent">
                    Save
                  </button>

                  <button type="button" onClick={handleSignOut} className="rounded-md bg-white/10 w-[50%] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                    Sign out
                  </button>  
                </div>
              </form>
            </div>
            

            {/* menu bar */}
            <MenuBar activeButton={"report"}/>
        </div>
    );
}
