import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios.js'

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
  const {data} = await axios.get('/posts')
  return data
})
export const fetchTags = createAsyncThunk('/tags/fetchTags', async () => {
  const {data} = await axios.get('/tags')
  return data
})
export const fetchFullPost = createAsyncThunk('/fullPost/fetchFullPost', async (id) => {
  const {data} = await axios.get(`/posts/${id}`)
  return data
})

export const fetchCreatePost = createAsyncThunk('/posts/fetchCreatePost', async (params) => {
  const {data} = await axios.post(`/posts`,params)
  return data
})
export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
  const {data} = await axios.delete(`/posts/${id}`)
  return data
})

const postSlice = createSlice({
	name: 'post',
	initialState: {
		posts: {
			items: [],
			status: 'loading',
		},
		tags: {
			items: [],
			status: 'loading',
		},
    fullPost:{
      items:[],
      status: 'loading',
    }
	},
	reducers: {

  },
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]:(state) => {
      state.posts.status = 'loading'
      state.posts.items = []
    },
    [fetchPosts.fulfilled]:(state,action) => {
      state.posts.status = 'success'
      state.posts.items = action.payload
    },
    [fetchPosts.rejected]:(state) => {
      state.posts.status = 'error'
      state.posts.items = []
    },

    // Получение тегов
    [fetchTags.pending]:(state) => {
      state.tags.status = 'loading'
      state.tags.items = []
    },
    [fetchTags.fulfilled]:(state,action) => {
      state.tags.status = 'success'
      state.tags.items = action.payload
    },
    [fetchTags.rejected]:(state) => {
      state.tags.status = 'error'
      state.tags.items = []
    },

    // Получение целой статьи
    [fetchFullPost.pending]:(state) => {
      state.fullPost.status = 'loading'
      state.fullPost.items = []
    },
    [fetchFullPost.fulfilled]:(state,action) => {
      state.fullPost.status = 'success'
      state.fullPost.items = action.payload
    },
    [fetchFullPost.rejected]:(state) => {
      state.fullPost.status = 'error'
      state.fullPost.items = []
    },

    //Создание статьи
    [fetchCreatePost.pending]:(state) => {
      state.posts.status = 'loading'
      state.posts.items = []
    },
    [fetchCreatePost.fulfilled]:(state,action) => {
      state.posts.status = 'success'
      state.posts.items = action.payload
    },
    [fetchCreatePost.rejected]:(state) => {
      state.posts.status = 'error'
      state.posts.items = []
    },

    // Удаление статьи
    [fetchRemovePost.pending]:(state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg )
    },
    [fetchRemovePost.rejected]:(state) => {
      state.posts.status = 'error'
    },
  }
})

export default {} = postSlice.reducer