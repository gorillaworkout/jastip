'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { auth, db } from '@/config/firebase'
import { getEvents } from '@/data'
import { clearAccount, setAccount } from '@/features/account/accountSlice'
import { setOrders } from '@/features/orders/orderSlice'
import { RootState } from '@/features/store'
import { setTrips } from '@/features/trip/tripSlice'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
} from '@heroicons/react/16/solid'
import { Cog6ToothIcon, HomeIcon, Square2StackIcon, TicketIcon } from '@heroicons/react/20/solid'
import { current } from '@reduxjs/toolkit'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function AccountDropdownMenu({ anchor, isLogin }: { anchor: 'top start' | 'bottom end'; isLogin: false | true }) {
  const dispatch = useDispatch()
  const [activeTrip, setActiveTrip] = useState<string>('october')
  const [kurs, setKurs] = useState<number>(105)
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // setUser(null);
      dispatch(clearAccount())
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(()=>{
    const fetchingOrders = async () => {
      // fetch all trip
      const collectionTrip = collection(db, 'trip')
      const tripCollectionSnapshot = await getDocs(collectionTrip)

      const tripList = tripCollectionSnapshot.docs.map((doc) => ({
        id: doc.data().id || 'Error Id',
        tripName: doc.data().tripName || 'Unknown',
        tripWeight: doc.data().tripWeight || 'Unknown',
        tripRoute: doc.data().tripRoute || 'Unknown',
        tripDate: doc.data().tripDate || 'Unknown'
      }))
      dispatch(setTrips(tripList))
      // fetch all trip

      const collectionRef = collection(db, 'orders')
      const orderCollectionSnapshot = await getDocs(collectionRef)

      const order = orderCollectionSnapshot.docs.map((doc) => {
        // Logging the trip name for debugging
        return {
          id: doc.data().id || 'Error Id',
          name: doc.data().name || 'Unknown',
          address: doc.data().address || '',
          phone: doc.data().phone || '',
          receiveTime: doc.data().receiveTime || '',
          pricePerKg: doc.data().pricePerKg || 0,
          totalKg: doc.data().totalKg || 0,
          tripName: doc.data().tripName || 'Unknown',
          detail: doc.data().detail || 'Unknown',
          uid: doc.data().uid || 'unknown'
        }
      })
      dispatch(setOrders(order))


      const findActiveTrip = order.filter((val, id) => {
        return val.tripName === activeTrip
      })
      const findTotalIncome = order.reduce((total, val) => {
        if (val.tripName === activeTrip) {
          return total + val.pricePerKg * val.totalKg * kurs;
        }
        return total; // return the current total when the condition is not met
      }, 0); // Initial value for the accumulator (total) is set to 0

      // setIncome(findTotalIncome)
      const findTotalCustomer = order.reduce((total, val) => {
        if (val.tripName === activeTrip) {
          return total + 1
        }
        return total; // return the current total when the condition is not met
      }, 0); // Initial value for the accumulator (total) is set to 0
      const findTotalWeight = order.reduce((total, val) => {
        // console.log(total, val.totalKg, '107');
        if (val.tripName === activeTrip) {
          return total + parseInt(val.totalKg)
        }
        return total; // return the current total when the condition is n
      }, 0);
      // console.log(findTotalWeight, 'findtotalweight')
      // setTotalWeight(findTotalWeight.toString())
      // setTotalCustomer(findTotalCustomer)
      // setIsFetched(true) // Set the flag to true after fetching
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // setUser(currentUser);
        console.log("User photoURL:", currentUser.photoURL);  // Log to verify URL
        let currentAcc = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          emailVerified: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          photo: currentUser.photoURL,
          uid: currentUser.uid 
        }
        dispatch(setAccount(currentAcc))
        fetchingOrders()
      } else {
        // setUser(null);
        dispatch(clearAccount())
      }
    });

    
    return () => unsubscribe();
  },[dispatch])
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      {/* <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem> */}
      {/* <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem> */}
      {/* <DropdownDivider /> */}
      {isLogin ? (
        <DropdownItem onClick={handleLogout}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      ) : (
        <DropdownItem href="/login">
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign In</DropdownLabel>
        </DropdownItem>
      )}
    </DropdownMenu>
  )
}

export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>
  children: React.ReactNode
}) {
  let pathname = usePathname()
  const currentUser = useSelector((state: RootState) => state.account.account)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" isLogin={currentUser.displayName !== ''} />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/teams/catalyst.svg" />
                <SidebarLabel>Jastip</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Jastip</DropdownLabel>
                </DropdownItem>
                {/* <DropdownItem href="#">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem> */}
                <DropdownDivider />
                {/* <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>
          {currentUser.displayName !== '' ? (
            <>
              <SidebarBody>
                <SidebarSection>
                  <SidebarItem href="/" current={pathname === '/'}>
                    <HomeIcon />
                    <SidebarLabel>Home</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/expense" current={pathname.startsWith('/expense')}>
                    <Square2StackIcon />
                    <SidebarLabel>Expense</SidebarLabel>
                  </SidebarItem>
                  {/* <SidebarItem href="/events" current={pathname.startsWith('/events')}>
                    <Square2StackIcon />
                    <SidebarLabel>Events</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/orders" current={pathname.startsWith('/orders')}>
                    <TicketIcon />
                    <SidebarLabel>Orders</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                    <Cog6ToothIcon />
                    <SidebarLabel>Settings</SidebarLabel>
                  </SidebarItem> */}
                </SidebarSection>

                {/* upcoming events */}
                {/* <SidebarSection className="max-lg:hidden">
                  <SidebarHeading>Upcoming Events</SidebarHeading>
                  {events.map((event) => (
                    <SidebarItem key={event.id} href={event.url}>
                      {event.name}
                    </SidebarItem>
                  ))}
                </SidebarSection>

                <SidebarSpacer /> */}

                {/* upcoming events */}
                {/* 
            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection> */}
              </SidebarBody>
              <SidebarFooter className="max-lg:hidden">
                <Dropdown>
                  <DropdownButton as={SidebarItem}>
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar src={currentUser.photo} className="size-10" square alt="" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                          {currentUser.displayName}
                        </span>
                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                          {currentUser.email}
                        </span>
                      </span>
                    </span>
                    <ChevronUpIcon />
                  </DropdownButton>
                  <AccountDropdownMenu anchor="top start" isLogin={currentUser.displayName !== ''} />
                </Dropdown>
              </SidebarFooter>
            </>
          ) : (
            <>
              <SidebarFooter className="absolute bottom-0 w-full max-lg:hidden">
                <Dropdown>
                  <DropdownButton as={SidebarItem}>
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar src="/users/user.jpg" className="size-10" square alt="" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">User</span>
                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                          User
                        </span>
                      </span>
                    </span>
                    <ChevronUpIcon />
                  </DropdownButton>
                  <AccountDropdownMenu anchor="top start" isLogin={currentUser.displayName !== ''} />
                </Dropdown>
              </SidebarFooter>
            </>
          )}
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
