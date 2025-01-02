'use client'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { RootState } from '@/features/store'
// import type { Metadata } from 'next'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import settingSlice from './../../features/setting/settingSlice';
// export const metadata: Metadata = {
//   title: 'Settings',
// }

export default function Settings() {
  const subcategory = useSelector((state: RootState) => state.setting.subcategory)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }

  return (
    <form method="post" className="mx-auto max-w-4xl">
      <Heading>Settings</Heading>
      <Divider className="my-10 mt-6" />

      <section className="flex flex-col gap-x-8 gap-y-6">
        <div className="space-y-1">
          <Subheading>Sub Category</Subheading>
          <Text>This will be displayed on your expense.</Text>
        </div>
        <div className="flex flex-col">
          {
            subcategory.map((val,id)=>{
              return (
                <>
                  <div className="flex flex-row gap-x-4">
                    <p className="w-[205px]">{val.name}</p> 
                    <TrashIcon className="w-4 hover:cursor-pointer"/>
                  </div>
                </>
              )
            })
          }
        </div>
        <div className="flex flex-row gap-x-4">
          <Input
            aria-label="Sub Category"
            name="name"
            placeholder="Add Sub Category"
            value={inputValue}
            onChange={handleInputChange}
            className="w-[200px] bg-transparent placeholder:text-gray-300 focus:border-t-transparent  focus:outline-none focus:ring-0 active:border-t-transparent"
          />
        <PlusCircleIcon className="w-6 text-gray-300 hover:cursor-pointer" />
          
        </div>
      </section>

      {/* <div className="flex justify-end gap-4">
        <Button type="reset" plain>
          Reset
        </Button>
        <Button type="submit">Save changes</Button>
      </div> */}
    </form>
  )
}
