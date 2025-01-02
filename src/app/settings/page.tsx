'use client'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Text } from '@/components/text'
// import type { Metadata } from 'next'
import { PlusIcon } from '@heroicons/react/20/solid'
import { SetStateAction, useState } from 'react'
// export const metadata: Metadata = {
//   title: 'Settings',
// }

export default function Settings() {
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
        <div className="flex flex-row gap-2">
          <input
            aria-label="Sub Category"
            name="name"
            placeholder="Add Sub Category"
            value={inputValue}
            onChange={handleInputChange}
            className="w-auto border-t-transparent bg-transparent placeholder:text-gray-300 focus:border-t-transparent !border-b-2 focus:outline-none focus:ring-0 active:border-t-transparent"
          />
          {inputValue.trim() && <PlusIcon className="w-4 text-gray-300 hover:cursor-pointer" />}
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
