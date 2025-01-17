'use client'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import ModalExpense from '@/components/ModalExpense'
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
      {/* <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div> */}
    </div>
  )
}

export function formatToRupiah(amount: number): string {
  return 'RP ' + amount?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  // Fetching orders from Firestore
  useEffect(() => {
    countTotalExpense()
    if (isFetched) return // Prevent fetching if already done

    // console.log('Fetching orders from Firestore...')
    const fetchingOrders = async () => {
      const collectionRef = collection(db, 'expense')
      const orderCollectionSnapshot = await getDocs(collectionRef)
      // console.log(currentUser, 'current user');
      const expenseList = orderCollectionSnapshot.docs
        .filter((doc) => doc.data().uid === currentUser.uid && startDate === "" && endDate === "") // Filter only matching documents
        .map((doc) => ({
          id: doc.data().id || 'Error Id',
          description: doc.data().description || 'Unknown',
          expense: doc.data().expense || 0,
          subcategory: doc.data().subcategory || '',
          bank: doc.data().bank || '',
          date: doc.data().date || '',
          uid: doc.data().uid || ''
        }));
      dispatch(setExpenses(expenseList))

      setIsFetched(true) // Set the flag to true after fetching
      countTotalExpense() // count total expenses
    }
    fetchingOrders()

  }, [dispatch, allExpenses, isFetched, currentUser]) // Add isFetched as a dependency

  const countTotalExpense = () => {
    const findTotalExpense = allExpenses.reduce((total, val) => {
      return total + val.expense
    }, 0);
    setTotalExpense(findTotalExpense);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Convert the string to a Date object
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };



  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };
  useEffect(() => {
    fetchingOrders()

  }, [startDate, endDate])

  const fetchingOrders = async () => {
    const collectionRef = collection(db, 'expense');
    const orderCollectionSnapshot = await getDocs(collectionRef);
    // console.log(currentUser, 'current user');

    const expenseList = orderCollectionSnapshot.docs
      .filter((doc) => {
        const docData = doc.data();
        const docDate = new Date(docData.date); // Assuming date is in a compatible format
        // console.log(docDate, 'docDate');

        // Filter by user ID
        if (docData.uid !== currentUser.uid) return false;

        // Normalize dates to midnight
        const normalizeDate = (date: Date) =>
          new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const start = startDate ? normalizeDate(new Date(startDate)) : null;
        const end = endDate ? normalizeDate(new Date(endDate)) : null;
        const normalizedDocDate = normalizeDate(docDate);

        // Filter logic:
        if (start && normalizedDocDate < start) return false; // Exclude dates before startDate
        if (end && normalizedDocDate > end) return false; // Exclude dates after endDate
        // console.log('expense list from date', start, end, normalizedDocDate);
        return true; // Include valid documents
      })
      .map((doc) => ({
        id: doc.data().id || 'Error Id',
        description: doc.data().description || 'Unknown',
        expense: doc.data().expense || 0,
        subcategory: doc.data().subcategory || '',
        bank: doc.data().bank || '',
        date: doc.data().date || '',
        uid: doc.data().uid || ''
      }));

    // Dispatch filtered expenses to Redux
    console.log(expenseList, 'expese List');
    dispatch(setExpenses(expenseList));

    setIsFetched(true); // Set the flag to true after fetching
    countTotalExpense(); // Count total expenses
  };




  return (
    <>
      <Heading>Hello, {currentUser.displayName}</Heading>
      <div className="mt-8 flex items-end justify-between sm:flex-row flex-col">
        <Subheading>Expense Overview</Subheading>
        <div className="flex flex-row items-end gap-x-5">
          <div className="flex justify-between items-end sm:items-center gap-4 flex-col sm:flex-row">
            {/* Start Date Section */}
            <div className="flex text-left w-full">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-white mb-1"
              >
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full p-2 bg-white/5 border border-gray-300 rounded-[calc(theme(borderRadius.lg)-1px)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date Section */}
            <div className="flex text-left w-full">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-white mb-1"
              >
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                min={startDate} // Ensures the end date is not before the start date
                className="w-full p-2 bg-white/5 border border-gray-300 rounded-[calc(theme(borderRadius.lg)-1px)]  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Expense" value={formatToRupiah(totalExpense)} change="+4.5%" />
        <Stat title="Total Item" value={allExpenses.length.toString()} change="-0.5%" />
        {/* <Stat title="Total Bank" value="20" change="+4.5%" /> */}
        {/* <Stat title="Total Trip" value="12" change="+21.2%" /> */}
      </div>
      <div className="mt-8 flex w-full justify-end">
        <ModalExpense initialOpen={false} description={'Expense'} />
      </div>
      <Subheading className="mt-14">Recent Expense</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Expense</TableHeader>
            <TableHeader>Subcategory</TableHeader>
            <TableHeader >Bank</TableHeader>
            <TableHeader className="text-right">Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExpenses
            .slice() // Use slice to create a shallow copy to avoid mutating the original array
            .sort((a, b) => parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1])) // Sort orders by ID in ascending order
            .map((order) => {
              return (
                (
                  // <TableRow key={order.id} href={'/orders/3000'} title={`Order #${order.id}`}> // if you want to direct to another page
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>{formatToRupiah(order?.expense)}</TableCell>
                    <TableCell>{order.subcategory}</TableCell>
                    <TableCell >{order.bank}</TableCell>
                    <TableCell className="text-right">{formatDate(order.date)}</TableCell>
                  </TableRow>
                )
              )
            })}
        </TableBody>
      </Table>
    </>
  )
}
