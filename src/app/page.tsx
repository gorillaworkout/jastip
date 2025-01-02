'use client'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import ModalToggleSSR from '@/components/ModalToggleSSR'
import ModalToggleTrip from '@/components/ModalToggleTrip'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { db } from '@/config/firebase'
import { RootState } from '@/features/store'
import { setTrips } from '@/features/trip/tripSlice'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '../features/orders/orderSlice'
import { formatToRupiah } from './expense/page' 
import { Account } from '@/features/account/accountSlice'
import { setSubcategory } from '@/features/setting/settingSlice'
export function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        {/* <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '} */}
        {/* <span className="text-zinc-500">from last week</span> */}
      </div>
    </div>
  )
}

export const fetchFirebase = async (currentUser: Account) => {
  console.log('fetch firebase from page.tsx')
  
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
    console.log(subCategory, 'subCategory')
    return subCategory
  }

  const fetchingOrders = async (currentUser: Account) => {
    const tripList = await fetchingTrip() // Wait for trip data
    const subCategory = await fetchingSubCategory() // Wait for subcategory data

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
    }
  }

  const { tripList, subCategory, order } = await fetchingOrders(currentUser)

  return {
    trip: tripList,
    subcategory: subCategory,
    orders: order,
    fetching: true,
  }
}


export default function Home() {
  const dispatch = useDispatch()
  const allOrders = useSelector((state: RootState) => state.orders.orders)
  const allTrips = useSelector((state: RootState) => state.trips.trips)
  const currentUser = useSelector((state: RootState) => state.account.account)
  const [isFetched, setIsFetched] = useState(false) // Local state to track if data is fetched
  const [activeTrip, setActiveTrip] = useState<string>('october')
  const [income, setIncome] = useState<number>(0)
  const [totalCustomer, setTotalCustomer] = useState<number>(0)
  const [totalWeight, setTotalWeight] = useState<string>('')
  const [kurs, setKurs] = useState<number>(105)
  const router = useRouter()
  // Fetching orders from Firestore
  // console.log(allOrders,  ' all orderss');
  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return // Prevent fetching if already done
  
      console.log('Fetching orders from Firestore...', currentUser)
  
      try {
        const result = await fetchFirebase(currentUser)
        console.log(result, 'all fetch')  // This will now show the fetched data
        setIsFetched(result.fetching)
        dispatch(setTrips(result.trip))
        dispatch(setOrders(result.orders))
        dispatch(setSubcategory(result.subcategory))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  
    fetchData()
  }, [dispatch, allOrders, isFetched, allTrips, currentUser]) // Add dependencies as necessary
  

  const handleActiveTrip = (name: string) => {
    setActiveTrip(name)
  }

  useEffect(() => {
    if (currentUser.email === '') {
      router.push('/login')
    }
  }, [currentUser])
  return (
    <>
      <div className="mt-8 flex w-full items-center justify-between">
        <Heading>Hello, {currentUser.displayName}</Heading>
        <ModalToggleTrip initialOpen={false} description={'Trip'} />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select
            name="period"
            value={activeTrip} // Bind the selected value
            onChange={(e) => handleActiveTrip(e.target.value)} // Listen for changes on the select element
          >
            {allTrips?.map((val, id) => {
              return (
                <option key={id} value={val.tripName}>
                  {val.tripName}
                </option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Perkiraan Income" value={formatToRupiah(income)} />
        <Stat title="Total Customer" value={totalCustomer.toString()} />
        <Stat title="Total Weight" value={totalWeight} />
        <Stat title="Kurs Yen" value={kurs.toString()} />
      </div>
      <div className="mt-8 flex w-full justify-end">
        <ModalToggleSSR initialOpen={false} description={'Order'} />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            {/* <TableHeader>Order ID</TableHeader> */}
            <TableHeader>Name</TableHeader>
            <TableHeader>Detail</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Receive</TableHeader>
            <TableHeader>Total KG</TableHeader>
            <TableHeader className="text-right">Price</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders
            .slice() // Use slice to create a shallow copy to avoid mutating the original array
            .sort((a, b) => parseInt(a.id) - parseInt(b.id)) // Sort orders by ID in ascending order
            .map((order) => {
              if (order?.tripName === activeTrip) {
                return (
                  // <TableRow key={order.id} href={'/orders/3000'} title={`Order #${order.id}`}>
                  <TableRow key={order.id}>
                    {/* <TableCell>{order.id}</TableCell> */}
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.detail}</TableCell>
                    <TableCell className="line-clamp-2 overflow-hidden text-ellipsis whitespace-normal">
                      {order.address}
                    </TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.receiveTime}</TableCell>
                    <TableCell>{order.totalKg}</TableCell>
                    <TableCell className="text-right">{order.pricePerKg} Y</TableCell>
                  </TableRow>
                )
              }
            })}
        </TableBody>
      </Table>
    </>
  )
}
