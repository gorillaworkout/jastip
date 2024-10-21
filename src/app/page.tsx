'use client'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import ModalToggleSSR from '@/components/ModalToggleSSR'
import ModalToggleTrip from '@/components/ModalToggleTrip'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { db } from '@/config/firebase'
import { RootState } from '@/features/store'
import { OrderData, TripData } from '@/interface/interface'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '../features/orders/orderSlice'
export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}

export default function Home() {
  const dispatch = useDispatch()
  const allOrders = useSelector((state: RootState) => state.orders.orders)
  console.log(allOrders, 'allorders')
  const [isFetched, setIsFetched] = useState(false) // Local state to track if data is fetched
  const [activeTrip, setActiveTrip] = useState<string>('september')
  const [allTrip, setAllTrip] = useState<TripData[]>()
  // Fetching orders from Firestore
  useEffect(() => {
    if (isFetched) return // Prevent fetching if already done

    console.log('Fetching orders from Firestore...')
    const fetchingOrders = async () => {
      // fetch all trip
      const collectionTrip = collection(db, 'trip')
      const tripCollectionSnapshot = await getDocs(collectionTrip)

      const tripList = tripCollectionSnapshot.docs.map((doc) => ({
        id: doc.data().id || 'Error Id',
        tripName: doc.data().tripName || 'Unknown',
        tripWeight: doc.data().tripWeight || 'Unknown',
        tripRoute: doc.data().tripRoute || 'Unknown',
      }))
      console.log(tripList, 'trip list')
      setAllTrip(tripList)
      // fetch all trip

      const collectionRef = collection(db, 'orders')
      const orderCollectionSnapshot = await getDocs(collectionRef)

      const order = orderCollectionSnapshot.docs
        .map((doc) => {
          // Logging the trip name for debugging
          console.log(doc.data().tripName, ' doc ', activeTrip)

          // Check if tripName matches the activeTrip
          // if (doc.data().tripName === activeTrip) {
            return {
              id: doc.data().id || 'Error Id',
              name: doc.data().name || 'Unknown',
              address: doc.data().address || '',
              phone: doc.data().phone || '',
              receiveTime: doc.data().receiveTime || '',
              pricePerKg: doc.data().pricePerKg || '0',
              totalKg: doc.data().totalKg || '0',
              tripName: doc.data().tripName || 'Unknown',
            }
          // }

          // Return undefined for unmatched docs
          // return undefined
        })
        // .filter(Boolean) as OrderData[] // Remove undefined values
      console.log(order, 'final order after filter')
      // console.log(orderList, 'final order list')
      dispatch(setOrders(order))
      setIsFetched(true) // Set the flag to true after fetching
    }

    fetchingOrders()
  }, [dispatch, allOrders, isFetched]) // Add isFetched as a dependency

  const handleActiveTrip = (name: string) => {
    console.log(name, ' active trip')
    setActiveTrip(name)
  }
  return (
    <>
      <div className="mt-8 flex w-full items-center justify-between">
        <Heading>Hello, Bayu Darmawan</Heading>
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
            {allTrip?.map((val, id) => {
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
        <Stat title="Total Income" value="20.600.000" change="+4.5%" />
        <Stat title="Total Customer" value="20" change="-0.5%" />
        <Stat title="Total Weight" value="20" change="+4.5%" />
        <Stat title="Total Trip" value="12" change="+21.2%" />
      </div>
      <div className="mt-8 flex w-full justify-end">
        <ModalToggleSSR initialOpen={false} description={'Order'} />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Name</TableHeader>
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
              if (order.tripName === activeTrip){
                return (
                  // <TableRow key={order.id} href={'/orders/3000'} title={`Order #${order.id}`}>
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
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
