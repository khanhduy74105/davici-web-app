import {createSlice} from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        isLoading: true,
        isAuthenticate: false,
        user: {}
    },
    reducers: {
        setAuth: (state, action)=>{
            state.isLoading = false;
            state.isAuthenticate = true;
            state.user = action.payload
        },
        setLogout: (state)=>{
            state.isAuthenticate = false;
            state.user = {};
        },
    }
})
export const {setAuth,setLogout} = authSlice.actions
export default authSlice.reducer