import { Account } from "@/features/account/accountSlice"
import { collection, getDocs } from "firebase/firestore"
import { db } from '@/config/firebase'
const fetchFirebase = async (currentUser: Account) => {
    // console.log('fetch firebase from page.tsx')

    const fetchingTrip = async () => {
        const collectionTrip = collection(db, 'trip')
        const tripCollectionSnapshot = await getDocs(collectionTrip)

        const tripList = tripCollectionSnapshot.docs.map((doc) => ({
            id: doc.data().id || 'Error Id',
            tripName: doc.data().tripName || 'Unknown',
            tripWeight: doc.data().tripWeight || 'Unknown',
            tripRoute: doc.data().tripRoute || 'Unknown',
            tripDate: doc.data().tripDate || 'Unknown',
        }))
        return tripList
    }

    const fetchingSubCategory = async () => {
        const collectionTrip = collection(db, 'subcategory')
        const tripCollectionSnapshot = await getDocs(collectionTrip)

        const subCategory = tripCollectionSnapshot.docs.map((doc) => ({
            id: doc.data().id || 'Error Id',
            name: doc.data().name || 'Unknown',
            uid: doc.data().uid || 'Unknown',
        }))
        // console.log(subCategory, 'subCategory')
        return subCategory
    }

    const fetchingBank = async () => {
        const collectionTrip = collection(db, 'bank')
        const tripCollectionSnapshot = await getDocs(collectionTrip)

        const bank = tripCollectionSnapshot.docs.map((doc) => ({
            id: doc.data().id || 'Error Id',
            name: doc.data().name || 'Unknown',
            uid: doc.data().uid || 'Unknown',
        }))
        // console.log(bank, 'subCategory')
        return bank
    }
    const fetchingOrders = async (currentUser: Account) => {
        const tripList = await fetchingTrip() // Wait for trip data
        const subCategory = await fetchingSubCategory() // Wait for subcategory data
        const bank = await fetchingBank() // Wait for bank data

        const collectionRef = collection(db, 'orders')
        const orderCollectionSnapshot = await getDocs(collectionRef)

        const order = orderCollectionSnapshot.docs
            .filter((doc) => doc.data().uid === currentUser.uid) // Filter only matching documents
            .map((doc) => ({
                id: doc.data().id || 'Error Id',
                name: doc.data().name || 'Unknown',
                address: doc.data().address || '',
                phone: doc.data().phone || '',
                receiveTime: doc.data().receiveTime || '',
                pricePerKg: doc.data().pricePerKg || 0,
                totalKg: doc.data().totalKg || 0,
                tripName: doc.data().tripName || 'Unknown',
                detail: doc.data().detail || 'Unknown',
                uid: doc.data().uid || 'Unknown',
            }))

        return {
            tripList,
            subCategory,
            order,
            bank
        }
    }

    const { tripList, subCategory, order, bank } = await fetchingOrders(currentUser)

    return {
        trip: tripList,
        subcategory: subCategory,
        orders: order,
        bank: bank,
        fetching: true,
    }
}


export { fetchFirebase }