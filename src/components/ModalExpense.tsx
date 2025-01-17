"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import ModalExpenseDetail from './ModalExpenseDetail'
import { addExpense } from '@/features/expense/expenseSlice'
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { addExpenseFirebase } from '@/utils/firebase'
import { ExpenseData } from '@/interface/interface'
import { RootState } from '@/features/store'
interface ModalExpenseProps {
  initialOpen: boolean
  description: string;
}


// Main component with toggle logic
const ModalExpense: React.FC<ModalExpenseProps> = ({ initialOpen , description}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.account.account)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialOpen)
  const [expense, setExpense] = useState<ExpenseData | null>(null) // State to store a single order object

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleSave = async(expenseData: ExpenseData) => {
    // Update the order with the latest order data (single object)
    setExpense(expenseData)
    
    const collectionRef = collection(db, 'expense')
    const orderCollectionSnapshot = await getDocs(collectionRef)
    const orderList = orderCollectionSnapshot.docs.map(doc=>({
        ...doc.data()
      }))
    const finalExpenseData = {
      id: `exp-${orderList.length + 1}`,
      description: expenseData.description,
      expense: Number(expenseData.expense),
      bank: expenseData.bank,
      subcategory: expenseData.subcategory,
      date: expenseData.date,
      uid: currentUser.uid !== null ? currentUser.uid : ''
    }
    addExpenseFirebase(finalExpenseData)
    console.log(finalExpenseData, 'final expense data');
    dispatch(addExpense(finalExpenseData))
  }

  return (
    <>
      <div>
        <Button onClick={toggleModal} className="hover:cursor-pointer">
          {isModalOpen ? `Close ${description}` : `Add ${description}`}
        </Button>
        <ModalExpenseDetail isOpen={isModalOpen} toggleModal={toggleModal} onSave={handleSave} />
      </div>
    </>
  )
}

export default ModalExpense
