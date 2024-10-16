import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'
import { Button } from '@/components/button'
import ModalToggleSSR from '@/components/ModalToggleSSR';

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

export default async function Home() {
  let orders = await getRecentOrders()
  // const [isAddOrder,setIsAddOrder] = useState(false);

  const addOrder=()=>{

  }

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
      <div className="mt-8 w-full flex justify-end">
        {/* <Button className="hover:cursor-pointer">Add Order</Button> */}
        <ModalToggleSSR initialOpen={false} />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Receive Time</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
