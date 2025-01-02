// features/orders/ordersSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Account {
    displayName: string | null
    email: string | null
    emailVerified: string | null
    phoneNumber: string | null
    photo: string | null
    uid: string  | null
}

interface AccountState {
    account: Account
}

const initialState: AccountState = {
    account: {
        displayName: '',
        email: '',
        emailVerified: 'false',
        phoneNumber: '',
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
                emailVerified: '',
                phoneNumber: '',
                photo: '',
                uid: '' 
            }
        },
    },
})

export const { setAccount, clearAccount } = accountSlice.actions
export default accountSlice.reducer
