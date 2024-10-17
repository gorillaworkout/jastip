'use client'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import ModalToggleSSR from '@/components/ModalToggleSSR'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { db } from '@/config/firebase'
import { RootState } from '@/features/store'
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

  // Fetching orders from Firestore
  useEffect(() => {
    if (isFetched) return // Prevent fetching if already done

    console.log('Fetching orders from Firestore...')
    const fetchingOrders = async () => {
      const collectionRef = collection(db, 'orders')
      const orderCollectionSnapshot = await getDocs(collectionRef)

      const orderList = orderCollectionSnapshot.docs.map((doc) => ({
        id: doc.data().id || 'Error Id',
        name: doc.data().name || 'Unknown',
        address: doc.data().address || '',
        phone: doc.data().phone || '',
        receiveTime: doc.data().receiveTime || '',
        pricePerKg: doc.data().pricePerKg || '0',
        totalKg: doc.data().totalKg || '0',
      }))

      dispatch(setOrders(orderList))
      setIsFetched(true) // Set the flag to true after fetching
    }

    fetchingOrders()
  }, [dispatch, allOrders, isFetched]) // Add isFetched as a dependency

  return (
    <>
      <Heading>Hello, Bayu Darmawan</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="september_2024">September 2024</option>
            <option value="october_2024">October 2024</option>
            <option value="november_2024">November 2024</option>
            <option value="desember_2024">December 2024</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Income" value="20.600.000" change="+4.5%" />
        <Stat title="Total Customer" value="20" change="-0.5%" />
        <Stat title="Total Address" value="20" change="+4.5%" />
        <Stat title="Total Trip" value="12" change="+21.2%" />
      </div>
      <div className="mt-8 flex w-full justify-end">
        <ModalToggleSSR initialOpen={false} />
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
            .map((order) => (
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
            ))}
        </TableBody>
      </Table>
    </>
  )
}
