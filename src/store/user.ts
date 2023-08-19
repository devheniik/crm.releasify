import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'user',
    initialState: {
        isFirstRoute: false,
        initialRoute: '',
        accessToken: '',
        user: {},
        isAuth: false
    },
    reducers: {
        checkFirst: (state) => {
            state.isFirstRoute = true
        },
        setInitialRoute: (state, action: { payload: string }) => {
            state.initialRoute = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
            localStorage.setItem('access_token', action.payload)
        },
        setAuth: (state) => {
            state.isAuth = true
        }
    }
})

export const {
    checkFirst,
    setInitialRoute,
    setUser,
    setAccessToken,
    setAuth
} = user.actions

export default user