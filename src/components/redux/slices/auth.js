import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios.js'

export const fetchUserData = createAsyncThunk('/auth/fetchUserData', async(params) => {
const {data} = await axios.post('/auth/login', params)  
return data
})
export const fetchCreateUser = createAsyncThunk('/auth/fetchCreateUser', async(params) => {
const {data} = await axios.post('/auth/register', params)  
return data
})
export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async() => {
const {data} = await axios.get('/auth/me')  
return data
})

const initialState = {
  data:null,
  status:'loading',
  isAuthUser:false

}


const authSlice = createSlice({
	name: 'auth',
	initialState,
  reducers: {
    setAuthUser: (state,action) => {
      state.isAuthUser = action.payload
    },
    logout: (state,action) => {
      state.data = null
    },
  },
	extraReducers: {
    [fetchUserData.pending]:(state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchUserData.fulfilled]:(state,action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [fetchUserData.rejected]:(state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchAuthMe.pending]:(state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchAuthMe.fulfilled]:(state,action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [fetchAuthMe.rejected]:(state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchCreateUser.pending]:(state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchCreateUser.fulfilled]:(state,action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [fetchCreateUser.rejected]:(state) => {
      state.status = 'error'
      state.data = null
    },
  }
})
export const { setAuthUser, logout } = authSlice.actions
export default authSlice.reducer