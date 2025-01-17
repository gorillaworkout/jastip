import { IBank, SubCategory } from '@/features/setting/settingSlice';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// interface Person {
//     id: number;
//     name: string;
// }

// const people: Person[] = [
//     { id: 1, name: 'Tom Cook' },
//     { id: 2, name: 'Wade Cooper' },
//     { id: 3, name: 'Tanya Fox' },
//     { id: 4, name: 'Arlene Mccoy' },
//     { id: 5, name: 'Devon Webb' },
// ];

type IComboboxInputFieldProps = {
    allData: SubCategory[] | IBank[]
    // activeSubcategory: SubCategory
    onActiveData: (activeSubCategory: SubCategory | IBank | null) => void
}
const ComboboxInputField: React.FC<IComboboxInputFieldProps> = ({ allData,onActiveData }) => {
    // Ensure there's always a valid initial value
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<SubCategory | null>();
  
    const filteredSubCategory =
      query === ''
        ? allData
        : allData.filter((sub) => {
            return sub.name.toLowerCase().includes(query.toLowerCase());
          });
    useEffect(()=>{
        onActiveData(selected? selected : null)
    },[selected])
    return (
      <div className="mx-auto">
        <Combobox<SubCategory | null>
          value={selected ? selected : null}
          onChange={(value) => setSelected(value ? value : null)}
          onClose={() => setQuery('')}
        >
          <div className="relative">
            <ComboboxInput
              className={clsx(
                'relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',
                // Typography
                'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
                // Border
                'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
                // Background color
                'bg-transparent dark:bg-white/5',
                // Hide default focus styles
                'focus:outline-none',
                // Invalid state
                'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500',
                // Disabled state
                'data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]',
                // System icons
                'dark:[color-scheme:dark]',
                // 'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
              displayValue={(subcategory: SubCategory) => subcategory?.name || ''}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
            </ComboboxButton>
          </div>
  
          <ComboboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'w-[var(--input-width)] rounded-br-xl rounded-bl-xl  border-white/5 bg-black p-1 [--anchor-gap:var(--spacing-1)] border-[2px] empty:invisible border-r-[#4A4A4A] border-l-[#4A4A4A] border-b-[#4A4A4A]',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}
          >
            {[...filteredSubCategory]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((sub) => (
                <ComboboxOption
                  key={sub.id}
                  value={sub}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                  <div className="text-sm/6 text-white">{sub.name}</div>
                </ComboboxOption>
              ))}
          </ComboboxOptions>
        </Combobox>
      </div>
    );
  };
  


export default ComboboxInputField