import { createSlice } from '@reduxjs/toolkit'

import jwtDecode from 'jwt-decode'

const initialState = {
    user: null,
    token: null,
    expirationDate: null,
    invoice: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const decodedToken = jwtDecode(action.payload.token)
            state.user = action.payload.user
            state.token = decodedToken
            const expirationDate = Math.floor(Date.now() / 1000) + 10
            state.expirationDate = expirationDate
        },
        setLogOut: (state) => {
            state.user = null
            state.token = null
            state.expirationDate = null
        },
        setInvoice: (state, action) => {
            state.invoice = action.payload.invoice
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post._id)
                    return action.payload.post
                return post
            })
            state.posts = updatedPost
        }
    }
})

export const { setMode, setLogin, setLogOut, setInvoice, setPost } =
    authSlice.actions

export default authSlice.reducer
