"use client"

import {db} from '@/config/firebase'
import {addDoc, collection, getDocs} from 'firebase/firestore'

const addPost = async (formData)=>{
    const collectionRef = collection(db, 'orders')
    await addDoc(collectionRef,formData)
}

 export { addPost }