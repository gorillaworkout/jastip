'use client'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { db } from '@/config/firebase'
import { addSubcategory, setSubcategory } from '@/features/setting/settingSlice'
import { RootState } from '@/features/store'
import { addSubcategoryFirebase, deleteSubcategory } from '@/utils/firebase'
// import type { Metadata } from 'next'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { collection, getDocs } from 'firebase/firestore'
import { SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// export const metadata: Metadata = {
//   title: 'Settings',
// }

export default function Settings() {
  const dispatch = useDispatch()
  const subcategory = useSelector((state: RootState) => state.setting.subcategory)
  const currentUser = useSelector((state: RootState) => state.account.account)
  const [inputValue, setInputValue] = useState('')
  const [isActiveButton, setIsActiveButton] = useState(false)
  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setIsActiveButton(inputValue !== '')
  }, [inputValue])

  const onSaveSubcategory = async () => {
    // dispatch(setSubcategory(inputValue))
    const collectionRef = collection(db, 'subcategory')
    const orderCollectionSnapshot = await getDocs(collectionRef)
    const subcategoryList = orderCollectionSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }))

    const newSubcategory = {
      id: `subcat-${subcategoryList.length + 1}`,
      name: inputValue,
      uid: currentUser.uid !== null ? currentUser.uid : '',
    }

    addSubcategoryFirebase(newSubcategory)
    dispatch(addSubcategory(newSubcategory))
    setInputValue('')
  }
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSaveSubcategory()
    }
  }
  const onDeleteSubcategory = async (id: string) => {
    await deleteSubcategory(id)
    const collectionRef = collection(db, 'subcategory')
    const orderCollectionSnapshot = await getDocs(collectionRef)
    const subCategory = orderCollectionSnapshot.docs.map((doc) => ({
      id: doc.data().id || 'Error Id',
      name: doc.data().name || 'Unknown',
      uid: doc.data().uid || 'Unknown',
    }))
    dispatch(setSubcategory(subCategory))
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
        <div className="flex max-h-[200px] w-[300px] flex-col overflow-y-auto">
          {[...subcategory]
            .sort((a, b) => {
              const nameA = a.name ?? '' // Fallback to an empty string if null
              const nameB = b.name ?? '' // Fallback to an empty string if null
              return nameA.localeCompare(nameB)
            })
            .map((val) => (
              <div className="flex flex-row gap-x-4" key={val.id ?? `${val.name}-${Math.random()}`}>
                <p className="w-[205px]">
                  {val.name ? val.name.charAt(0).toUpperCase() + val.name.slice(1) : 'Unnamed'}
                </p>
                <TrashIcon className="w-4 hover:cursor-pointer" onClick={() => onDeleteSubcategory(val.id ?? '')} />
              </div>
            ))}
        </div>
        <div className="flex flex-row gap-x-4">
          <Input
            aria-label="Sub Category"
            name="name"
            placeholder="Add Sub Category"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="!w-[200px] bg-transparent placeholder:text-gray-300 focus:border-t-transparent focus:outline-none focus:ring-0 active:border-t-transparent"
          />
          <PlusCircleIcon
            onClick={isActiveButton ? onSaveSubcategory : undefined}
            className={`w-6 text-gray-300 hover:cursor-pointer ${isActiveButton ? 'text-white' : 'text-gray-400 hover:cursor-not-allowed'}`}
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
