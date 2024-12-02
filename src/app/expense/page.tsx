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
import { setExpenses } from '../../features/expense/expenseSlice'

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

export function formatToRupiah(amount: number): string {
  return 'RP ' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export default function Expense() {
  const dispatch = useDispatch()
  const allExpenses = useSelector((state: RootState) => state.expenses.expenses)
  console.log(allExpenses, 'allExpenses')
  const currentUser = useSelector((state: RootState) => state.account.account)
  const allTrips = useSelector((state: RootState) => state.trips.trips)
  const [activeTrip, setActiveTrip] = useState<string>('october')
  const [isFetched, setIsFetched] = useState(false) // Local state to track if data is fetched
  const [totalExpense, setTotalExpense] = useState<number>(0)


  
  const handleActiveTrip = (name: string) => {
    // console.log(name, ' active trip')
    setActiveTrip(name)
  }
  // Fetching orders from Firestore
  useEffect(() => {
    if (isFetched) return // Prevent fetching if already done

    console.log('Fetching orders from Firestore...')
    const fetchingOrders = async () => {
      const collectionRef = collection(db, 'expense')
      const orderCollectionSnapshot = await getDocs(collectionRef)
      const orderList = orderCollectionSnapshot.docs.map((doc) => ({
        id: doc.data().id || 'Error Id',
        description: doc.data().description || 'Unknown',
        expense: doc.data().expense || '',
        bank: doc.data().bank || ''
      }))
      console.log(orderList, 'order List')
      dispatch(setExpenses(orderList))
      
      setIsFetched(true) // Set the flag to true after fetching
      const findTotalExpense = orderList.reduce((total, val) => {
        // console.log(total, val.totalKg, '107');
        return total + parseInt(val.expense)
        // if (val.tripName === activeTrip) {
        // }
        // return total; // return the current total when the condition is n
      }, 0);
      // setTotalExpense(findTotalExpense)
      // console.log(typeof findTotalExpense);
    }
    fetchingOrders()
  }, [dispatch, allExpenses, isFetched]) // Add isFetched as a dependency

  
  return (
    <>
      <Heading>Hello, {currentUser.displayName}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Expense Overview</Subheading>
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
        <Stat title="Total Expense" value={totalExpense.toString()} change="+4.5%" />
        <Stat title="Total Customer" value="20" change="-0.5%" />
        <Stat title="Total Weight" value="20" change="+4.5%" />
        <Stat title="Total Trip" value="12" change="+21.2%" />
      </div>
      <div className="mt-8 flex w-full justify-end">
        <ModalToggleSSR initialOpen={false} description={'Expense'}/>
      </div>
      <Subheading className="mt-14">Recent Expense</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Expense</TableHeader>
            <TableHeader className="text-right">Bank</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExpenses
            .slice() // Use slice to create a shallow copy to avoid mutating the original array
            .sort((a, b) => parseInt(a.id) - parseInt(b.id)) // Sort orders by ID in ascending order
            .map((order) => (
              // <TableRow key={order.id} href={'/orders/3000'} title={`Order #${order.id}`}>
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell>{formatToRupiah(order.expense)}</TableCell>
                <TableCell className="text-right">{order.bank}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}
