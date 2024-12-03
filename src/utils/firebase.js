"use client"

import {db} from '@/config/firebase'
import {addDoc, collection, getDocs} from 'firebase/firestore'

const addPost = async (formData)=>{
    const collectionRef = collection(db, 'orders')
    await addDoc(collectionRef,formData)
}

const addTripFirebase = async (formData)=>{
    console.log('add trip is running')
    const collectionRef = collection(db, 'trip')
    await addDoc(collectionRef,formData)
}

const addExpenseFirebase = async (formData)=>{
    console.log('add expense is running')
    const collectionRef = collection(db, 'expense')
    await addDoc(collectionRef,formData)
}

 export { addPost, addTripFirebase, addExpenseFirebase }