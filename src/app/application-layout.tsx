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
  SidebarItem,
  SidebarLabel,
  SidebarSection,
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
import { Cog6ToothIcon, HomeIcon, Square2StackIcon } from '@heroicons/react/20/solid'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFirebase } from './page'
import { setBank, setSubcategory } from '@/features/setting/settingSlice'
function AccountDropdownMenu({ anchor, isLogin }: { anchor: 'top start' | 'bottom end'; isLogin: false | true }) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.account.account)
  const [activeTrip, setActiveTrip] = useState<string>('october')
  const [kurs, setKurs] = useState<number>(105)
  const [isFetched, setIsFetched] = useState(false) // Local state to track if data is fetched
  const handleLogout = async () => {
    try {
      await signOut(auth)
      // setUser(null);
      dispatch(clearAccount())
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
      const fetchData = async () => {
          if (isFetched) return // Prevent fetching if already done
      
          // console.log('Fetching orders from Firestore...', currentUser)
      
          try {
            const result = await fetchFirebase(currentUser)
            console.log(result, 'all fetching from firebase')
            // console.log(result, 'all fetch')  // This will now show the fetched data
            setIsFetched(result.fetching)
            dispatch(setTrips(result.trip))
            dispatch(setOrders(result.orders))
            dispatch(setSubcategory(result.subcategory))
            dispatch(setBank(result.bank))
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
      
        fetchData()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // setUser(currentUser);
        // console.log('User photoURL:', currentUser.photoURL) // Log to verify URL
        let currentAcc = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          emailVerified: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          photo: currentUser.photoURL,
          uid: currentUser.uid,
        }
        dispatch(setAccount(currentAcc))
        fetchData()
      } else {
        // setUser(null);
        dispatch(clearAccount())
      }
    })

    return () => unsubscribe()
  }, [dispatch])
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
                  <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                    <Cog6ToothIcon />
                    <SidebarLabel>Settings</SidebarLabel>
                  </SidebarItem>
                  {/* <SidebarItem href="/orders" current={pathname.startsWith('/orders')}>
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
