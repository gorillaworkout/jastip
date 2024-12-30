import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Text } from '@/components/text'
import type { Metadata } from 'next'
import { Cog6ToothIcon, PlusIcon, } from '@heroicons/react/20/solid'
export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
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
            <PlusIcon className="w-4 text-gray-300"/>   
          <input
            aria-label="Sub Category"
            name="name"
            // defaultValue="Jastip"
            placeholder="Add Sub Category"
            className="w-1/2 border-transparent bg-transparent focus:border-transparent focus:outline-none focus:ring-0 active:border-transparent placeholder:text-gray-300"
          />
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
