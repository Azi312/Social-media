import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './types'

const initialState: InitialState = {
	mode: 'light',
	user: null,
	token: null,
	posts: [],
	users: [],
	search: '',
	notice: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setMode: state => {
			state.mode = state.mode === 'light' ? 'dark' : 'light'
		},
		setLogin: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
		},
		setLogout: state => {
			state.posts = []
			state.user = null
			state.token = null
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends
			} else {
				console.error('user friends non-existent :(')
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map(post => {
				if (post._id === action.payload.post._id) return action.payload.post
				return post
			})
			state.posts = updatedPosts
		},
		setUsers: (state, action) => {
			state.users = action.payload.users
		},
		setSearch: (state, action) => {
			state.search = action.payload
		},
		setNotice: (state, action) => {
			state.notice = action.payload
		},
	},
})

export const {
	setMode,
	setLogin,
	setLogout,
	setFriends,
	setPosts,
	setPost,
	setUsers,
	setSearch,
	setNotice,
} = authSlice.actions
export default authSlice.reducer
