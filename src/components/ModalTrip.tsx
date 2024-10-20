"use client"
import { useState } from 'react'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { TripData } from './ModalToggleTrip'
import { Description } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  toggleModal: () => void
  onSave: (orderData: TripData) => void // Pass the form data to parent on save
}

const ModalTrip: React.FC<ModalProps> = ({ isOpen, toggleModal, onSave }) => {
  const [formData, setFormData] = useState<TripData>({
    id: '',
    tripName: '',
    tripWeight: '',
    tripRoute:''
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Pass the form data to the parent component
    onSave(formData)
    toggleModal() // Close the modal after saving
  }

  return (
    <div className="modal-overlay z-50" style={overlayStyle}>
      <div className="modal-content w-1/2" style={modalStyle}>
        <form method="post" className="mx-auto max-h-[700px] overflow-y-scroll p-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <Heading>Add Trip</Heading>
            <Button onClick={toggleModal} className="hover:cursor-pointer">
              Close
            </Button>
          </div>

          <Divider className="my-5 mt-6" />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Trip Name</Subheading>
            </div>
            <div>
              <Input
                aria-label="Trip Name"
                name="tripName" // Updated name attribute
                value={formData.tripName}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Trip Weight</Subheading>
            </div>
            <div>
              <Input
                aria-label="Trip Weight"
                name="tripWeight" // Updated name attribute
                value={formData.tripWeight}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Trip Route</Subheading>
            </div>
            <div>
              <Input
                aria-label="Trip Route"
                name="tripRoute" // Updated name attribute
                value={formData.tripRoute}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />
          <div className="flex justify-end gap-4">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Basic styling for modal (for demonstration)
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const modalStyle: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}

export default ModalTrip
