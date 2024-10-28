// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Account {
    displayName: string
    email: string
    emailVerified: boolean
    phoneNumber: number
    photo: string
    uid: string 
}

interface AccountState {
    account: Account
}

const initialState: AccountState = {
    account: {
        displayName: '',
        email: '',
        emailVerified: false,
        phoneNumber: 0,
        photo: '',
        uid: '' 
    },
}

const accountSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<Account>) => {
            state.account = action.payload
        },
        clearAccount: (state) => {
            state.account = {
                displayName: '',
                email: '',
                emailVerified: false,
                phoneNumber: 0,
                photo: '',
                uid: '' 
            }
        },
    },
})

export const { setAccount, clearAccount } = accountSlice.actions
export default accountSlice.reducer
