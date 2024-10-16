"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import Modal from './Modal'

interface ModalToggleSSRProps {
  initialOpen: boolean
}

interface OrderData {
  name: string
  address: string
  phone: string
  receiveTime: string
  pricePerKg: string
}

// Main component with toggle logic
const ModalToggleSSR: React.FC<ModalToggleSSRProps> = ({ initialOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialOpen)
  const [order, setOrder] = useState<OrderData | null>(null) // State to store a single order object

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleSave = (orderData: OrderData) => {
    // Update the order with the latest order data (single object)
    setOrder(orderData)
  }

  useEffect(() => {
    console.log(order, 'order') // Log the latest order
  }, [order])

  return (
    <>
      <div>
        {
          
        }
        <Button onClick={toggleModal} className="hover:cursor-pointer">
          {isModalOpen ? 'Close Order' : 'Add Order'}
        </Button>
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} onSave={handleSave} />
      </div>
    </>
  )
}

export default ModalToggleSSR
