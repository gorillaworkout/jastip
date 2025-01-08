'use client'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading' 
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { RootState } from '@/features/store'
import { ExpenseData } from '@/interface/interface'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface ModalProps {
  isOpen: boolean
  toggleModal: () => void
  onSave: (orderData: ExpenseData) => void // Pass the form data to parent on save
}

const ModalExpenseDetail: React.FC<ModalProps> = ({ isOpen, toggleModal, onSave }) => {
  const dispatch = useDispatch()
  const subcategory = useSelector((state: RootState) => state.setting.subcategory)
  const today = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState<ExpenseData>({
    id: '',
    description: '',
    expense: 0,
    subcategory:'',
    bank: '',
    date: today,
    uid: '', // Add tripDate to form data
  })
  const [isActiveButton, setIsActiveButton] = useState(false)
  const [activeSubCategory, setActiveSubCategory] = useState<string>('october')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Pass the form data (including tripDate) to the parent component
    onSave(formData)
    toggleModal() // Close the modal after saving
    setFormData({
      id: '',
      description: '',
      subcategory:'',
      expense: 0,
      bank: '',
      date: '',
      uid: '',
    })
  }

  useEffect(() => {
    setIsActiveButton(formData.description !== '' && formData.expense !== 0 && formData.bank !== '')
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'expense') {
      const rawValue = Number(value.replace(/[^0-9]/g, '')) // Remove non-numeric characters
      setFormData({ ...formData, expense: rawValue }) // Update raw numeric value
      return // Skip setting formatted value directly
    }

    setFormData({ ...formData, [name]: value })
  }
  const formatToRupiah = (number: string | number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(number) || 0) // Format with dots as separators
  }

  const handleActiveTrip = (name: string) => {
    setActiveSubCategory(name)
  }

  return (
    <div className="modal-overlay z-50" style={{ ...overlayStyle, display: isOpen ? 'flex' : 'none' }}>
      <div className="modal-content w-1/2" style={modalStyle}>
        <form method="post" className="mx-auto max-h-[700px] overflow-auto p-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <Heading>Add Expense</Heading>
            <Button onClick={toggleModal} className="hover:cursor-pointer">
              Close
            </Button>
          </div>

          <Divider className="my-5 mt-6" />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Description</Subheading>
            </div>
            <div>
              <Input
                aria-label="Description"
                name="description" // Updated name attribute
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Nominal</Subheading>
            </div>
            <div>
              <Input
                aria-label="Expense"
                name="expense"
                id="expenseInput"
                value={formData.expense ? formatToRupiah(formData.expense) : ''} // Display formatted value
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Sub Category</Subheading>
            </div>
            <div>
              <Select
                name="period"
                value={activeSubCategory} // Bind the selected value
                onChange={(e) => handleActiveTrip(e.target.value)} // Listen for changes on the select element
              >
                {subcategory.map((val, id) => {
                  return (
                    <option key={id} value={val.name}>
                      {val.name}
                    </option>
                  )
                })}
              </Select>
            </div>
          </section>

          <Divider className="my-5" soft />
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Bank</Subheading>
            </div>
            <div>
              <Input
                aria-label="Bank"
                name="bank" // Updated name attribute
                value={formData.bank}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Date</Subheading>
            </div>
            <div>
              <Input
                type="date"
                aria-label="Date"
                name="date" // Updated name attribute
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <Divider className="my-5" soft />
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              disabled={!isActiveButton} // Disable the button if isActiveButton is false
              className={`${
                isActiveButton ? 'bg-red-500 hover:bg-red-600' : 'cursor-not-allowed bg-gray-400'
              } rounded px-4 py-2 text-white`}
            >
              Save changes
            </Button>
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

// Optional custom inline CSS for the date input
const inputDateStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid rgb(255 255 255 / 0.1)',
  width: '100%',
  background: 'rgb(255 255 255 / 0.1)',
}

export default ModalExpenseDetail
