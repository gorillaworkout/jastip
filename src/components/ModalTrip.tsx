'use client';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { TripData } from '@/interface/interface';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  onSave: (orderData: TripData) => void; // Pass the form data to parent on save
}

const ModalTrip: React.FC<ModalProps> = ({ isOpen, toggleModal, onSave }) => {
  const [formData, setFormData] = useState<TripData>({
    id: '',
    tripName: '',
    tripWeight: '',
    tripRoute: '',
    tripDate: '', // Add tripDate to form data
  });

  // Function to handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tripDate: value, // Update tripDate in form data
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the form data (including tripDate) to the parent component
    onSave(formData);
    toggleModal(); // Close the modal after saving
    setFormData({
      id: '',
      tripName: '',
      tripWeight: '',
      tripRoute: '',
      tripDate: '', // Add tripDate to form data
    })
  };

  return (
    <div className="modal-overlay z-50" style={{ ...overlayStyle, display: isOpen ? 'flex' : 'none' }}>
      <div className="modal-content w-1/2" style={modalStyle}>
        <form method="post" className="mx-auto max-h-[700px] overflow-auto p-4" onSubmit={handleSubmit}>
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

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Trip Date</Subheading>
            </div>
            <div>
              <input
                type="date"
                id="tripDate"
                name="tripDate" // Updated to align with formData
                value={formData.tripDate || ''} // Render tripDate from state
                onChange={handleDateChange} // Update formData when date changes
                className="w-full border border-gray-300 rounded-lg px-3 py-2" // Tailwind CSS styling for date input
                style={inputDateStyle} // Optional inline CSS styling
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
  );
};

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
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#000000',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

// Optional custom inline CSS for the date input
const inputDateStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid rgb(255 255 255 / 0.1)',
  width: '100%',
  background:'rgb(255 255 255 / 0.1)'
};

export default ModalTrip;
