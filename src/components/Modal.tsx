"use client"
import { useState } from 'react'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import { OrderData } from '@/interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/store'
interface ModalProps {
  isOpen: boolean
  toggleModal: () => void
  onSave: (orderData: OrderData) => void // Pass the form data to parent on save
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, onSave }) => {
  const allTrips = useSelector((state: RootState) => state.trips.trips)
  const [formData, setFormData] = useState<OrderData>({
    id: '',
    name: '',
    address: '',
    phone: '',
    receiveTime: '',
    pricePerKg: 0,
    totalKg: 0,
    tripName: '',
    detail: ''
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
        <form method="post" className="mx-auto max-h-[700px] overflow-auto p-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <Heading>Add Order</Heading>
            <Button onClick={toggleModal} className="hover:cursor-pointer">
              Close
            </Button>
          </div>

          <Divider className="my-5 mt-6" />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Customer Name</Subheading>
            </div>
            <div>
              <Input aria-label="Customer Name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
          </section>
          <Divider className="my-5" soft />
          <div>
          </div>

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Customer Trip Month</Subheading>
            </div>
            <div>
              <Select
                name="period"
                value={'Select'} // Bind the selected value
                // onChange={(e) => handleActiveTrip(e.target.value)} // Listen for changes on the select element
                onChange={handleInputChange}
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
          </section>


          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Customer Detail</Subheading>
            </div>
            <div>
              <Textarea aria-label="Customer Detail" name="detail" value={formData.detail} onChange={handleInputChange} />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Customer Address</Subheading>
            </div>
            <div>
              <Textarea aria-label="Customer Address" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Customer Phone Number</Subheading>
            </div>
            <div>
              <Input aria-label="Customer Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Receive</Subheading>
            </div>
            <div>
              <Select aria-label="Receive Time" name="receiveTime" value={formData.receiveTime} onChange={handleInputChange}>
                <option value="8-12">Select</option>
                <option value="8-12">8-12</option>
                <option value="14-16">14-16</option>
                <option value="16-18">16-18</option>
                <option value="18-20">18-20</option>
                <option value="19-21">19-21</option>
                <option value="bebas">Bebas</option>
              </Select>
            </div>
          </section>
          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Total KG</Subheading>
            </div>
            <div>
              <Input aria-label="Total KG" name="totalKg" value={formData.totalKg} onChange={handleInputChange} />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Price per KG</Subheading>
            </div>
            <div>
              <Input aria-label="Price Per KG" name="pricePerKg" value={formData.pricePerKg} onChange={handleInputChange} />
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

export default Modal
