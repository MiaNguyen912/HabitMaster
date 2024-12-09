import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/16/solid'

export default function WeekDropdown({selectedWeek, setSelectedWeek}) {
  function handleSelectWeek(week) {
    setSelectedWeek(week);
    console.log('Selected week:', week);
  }

  return (
    <div className="pb-4 px-4 text-right">
      <Menu __demoMode>
        <MenuButton className="inline-flex items-center gap-2 rounded-lg bg-secondary/80 py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondary data-[open]:bg-secondary data-[focus]:outline-1 data-[focus]:outline-white">
          {selectedWeek}
          <ChevronDownIcon className="size-4 fill-primary/60" />
        </MenuButton>

        <MenuItems transition anchor="bottom end" className="w-40 origin-top-right rounded-xl shadow-md bg-secondary/85 p-1 text-sm/6 text-primary transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
            <MenuItem>
            <button onClick={()=>handleSelectWeek("This week")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-400/30">
              This week
              <kbd className="ml-auto hidden font-sans text-xs text-primary/50 group-data-[focus]:inline">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={()=>handleSelectWeek("Last week")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-400/30">
              Last week
              <kbd className="ml-auto hidden font-sans text-xs text-primary/50 group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={()=>handleSelectWeek("2 weeks ago")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-400/30">
              2 weeks ago
              <kbd className="ml-auto hidden font-sans text-xs text-primary/50 group-data-[focus]:inline">⌘S</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={()=>handleSelectWeek("3 weeks ago")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-400/30">
              3 weeks ago
              <kbd className="ml-auto hidden font-sans text-xs text-primary/50 group-data-[focus]:inline">⌘F</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={()=>handleSelectWeek("4 weeks ago")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-400/30">
              4 weeks ago
              <kbd className="ml-auto hidden font-sans text-xs text-primary/50 group-data-[focus]:inline">⌘R</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
