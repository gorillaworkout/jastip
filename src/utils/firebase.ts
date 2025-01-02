"use client"

import {db} from '@/config/firebase'
import {addDoc, collection, getDocs} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { TripData } from '@/interface/interface';
import { ExpenseData } from './../interface/interface';
import { setTrips } from '@/features/trip/tripSlice';
import { setOrders } from '@/features/orders/orderSlice';

const addPost = async (formData: { id: string; address: string; name: string; phone: string; pricePerKg: number; receiveTime: string; totalKg: number; tripName: string; detail: string; uid: string })=>{
    const collectionRef = collection(db, 'orders')
    await addDoc(collectionRef,formData)
}

const addTripFirebase = async (formData: TripData)=>{
    console.log('add trip is running')
    const collectionRef = collection(db, 'trip')
    await addDoc(collectionRef,formData)
}

const addExpenseFirebase = async (formData: ExpenseData)=>{
    console.log('add expense is running')
    const collectionRef = collection(db, 'expense')
    await addDoc(collectionRef,formData)
}

export { addPost, addTripFirebase, addExpenseFirebase }