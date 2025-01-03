'use client'

import { db } from '@/config/firebase'
import { TripData } from '@/interface/interface'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { SubCategory } from './../features/setting/settingSlice'
import { ExpenseData } from './../interface/interface'

const addPost = async (formData: {
  id: string
  address: string
  name: string
  phone: string
  pricePerKg: number
  receiveTime: string
  totalKg: number
  tripName: string
  detail: string
  uid: string
}) => {
  const collectionRef = collection(db, 'orders')
  await addDoc(collectionRef, formData)
}

const addTripFirebase = async (formData: TripData) => {
  console.log('add trip is running')
  const collectionRef = collection(db, 'trip')
  await addDoc(collectionRef, formData)
}

const addExpenseFirebase = async (formData: ExpenseData) => {
  console.log('add expense is running')
  const collectionRef = collection(db, 'expense')
  await addDoc(collectionRef, formData)
}

const addSubcategoryFirebase = async (formData: SubCategory) => {
  console.log('add subcategory is running')
  const collectionRef = collection(db, 'subcategory')
  await addDoc(collectionRef, formData)
}

const deleteSubcategory = async (id: string) => {
  try {
    const collectionRef = collection(db, 'subcategory') // Replace with your collection name
    const q = query(collectionRef, where('id', '==', id)) // Query by the `id` field

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        const documentId = docSnapshot.id // Get the Document ID
        // await deleteDoc(doc(db, 'subcategories', documentId)) // Delete the document
        const docRef = doc(db, 'subcategory', documentId)
        await deleteDoc(docRef)
        console.log(`Document with ID ${documentId} successfully deleted.`)
      })
    } else {
      console.log('No matching document found.')
    }
  } catch (error) {
    console.error('Error deleting document: ', error)
  }
}
export { addExpenseFirebase, addPost, addSubcategoryFirebase, addTripFirebase, deleteSubcategory }
