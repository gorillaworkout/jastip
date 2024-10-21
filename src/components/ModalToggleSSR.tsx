"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import Modal from './Modal'
import { addPost } from '@/utils/firebase'
import { addOrder } from '@/features/orders/orderSlice'
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { OrderData } from '@/interface/interface'
interface ModalToggleSSRProps {
  initialOpen: boolean
  description: string;
}



// Main component with toggle logic
const ModalToggleSSR: React.FC<ModalToggleSSRProps> = ({ initialOpen , description}) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialOpen)
  const [order, setOrder] = useState<OrderData | null>(null) // State to store a single order object

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleSave = async(orderData: OrderData) => {
    // Update the order with the latest order data (single object)
    setOrder(orderData)
    
    const collectionRef = collection(db, 'orders')
    const orderCollectionSnapshot = await getDocs(collectionRef)
    const orderList = orderCollectionSnapshot.docs.map(doc=>({
        ...doc.data()
      }))
    const finalOrderData = {
      id: `${orderList.length + 1}`,
      address: orderData.address,
      name: orderData.name,
      phone:orderData.phone,
      pricePerKg: orderData.pricePerKg,
      receiveTime: orderData.receiveTime === '' ? '19-21' : orderData.receiveTime,
      totalKg: orderData.totalKg
    }
    addPost(finalOrderData)
    dispatch(addOrder(finalOrderData))
  }

  useEffect(() => {
    console.log(order, 'order') // Log the latest order
  }, [order])

  return (
    <>
      <div>
        <Button onClick={toggleModal} className="hover:cursor-pointer">
          {isModalOpen ? `Close ${description}` : `Add ${description}`}
        </Button>
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} onSave={handleSave} />
      </div>
    </>
  )
}

export default ModalToggleSSR