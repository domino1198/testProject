import {createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit'
import {getToken} from "./action";

export type Contact = {
    name:string,
    phone:string,
    id:number,
}

interface CounterState {
    contacts:Contact[],
    token: boolean
    status: 'idle' | 'pending' | 'finished' | 'failed'
}


const initialState: CounterState = {
    contacts: [],
    token: !!localStorage.getItem('token'),
    status: 'idle',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeToken: (state,action:PayloadAction<boolean>) => ({...state, token: action.payload}),
        changeContact: (state,action:PayloadAction<Contact[]>) => ({...state, contacts: action.payload})
    },
    extraReducers: (builder) => {
        builder.addCase(getToken.fulfilled, (state, action) => {
            return {...state, status: "finished", token: action.payload}
        })
        builder.addMatcher(
            isAnyOf(getToken.pending),
            (state) => {
                return {...state, status: "pending"}
            }
        );
        builder.addMatcher(
            isAnyOf(getToken.rejected),
            (state) => {
                return {...state, status: "failed"}
            }
        );
    }
})

export const {changeToken,changeContact} = userSlice.actions


