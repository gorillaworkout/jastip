"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import ModalTrip from './ModalTrip'
import { addTrip } from '@/features/trip/tripSlice'
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { addTripFirebase } from '@/utils/firebase'
import { TripData } from '@/interface/interface'
interface ModalToggleSSRProps {
  initialOpen: boolean
  description: string;
}


// Main component with toggle logic
const ModalToggleTrip: React.FC<ModalToggleSSRProps> = ({ initialOpen , description}) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialOpen)
  const [trip, setTrip] = useState<TripData | null>(null) // State to store a single order object

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleSave = async(tripData: TripData) => {
    // Update the order with the latest order data (single object)
    setTrip(tripData)
    
    const collectionRef = collection(db, 'trip')
    const orderCollectionSnapshot = await getDocs(collectionRef)
    const orderList = orderCollectionSnapshot.docs.map(doc=>({
        ...doc.data()
      }))
    const finalTripData = {
      id: `${orderList.length + 1}`,
      tripName: tripData.tripName,
      tripWeight: tripData.tripWeight,
      tripRoute: tripData.tripRoute,
      tripDate: tripData.tripDate
    }
    addTripFirebase(finalTripData)
    dispatch(addTrip(finalTripData))
  }

  useEffect(() => {
    console.log(trip, 'trip') // Log the latest trip
  }, [trip])

  return (
    <>
      <div>
        <Button onClick={toggleModal} className="hover:cursor-pointer">
          {isModalOpen ? `Close ${description}` : `Add ${description}`}
        </Button>
        <ModalTrip isOpen={isModalOpen} toggleModal={toggleModal} onSave={handleSave} />
      </div>
    </>
  )
}

export default ModalToggleTrip