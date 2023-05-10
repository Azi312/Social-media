import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAddFriend = createAsyncThunk(
	'auth/fetchAddFriend',
	async params => {
		const { userId, friendId } = params
		const { data } = await axios.patch(`/users/${userId}/${friendId}`)
		return data
	}
)
export const fetchUserFriends = createAsyncThunk(
	'auth/fetchUserFriends',
	async params => {
		const { userId } = params
		const { data } = await axios.get(`/users/${userId}/friends`)
		return data
	}
)
export const fetchUser = createAsyncThunk('auth/fetchUser', async params => {
	const { userId } = params
	const { data } = await axios.get(`/users/${userId}`)
	return data
})

const initialState = {
	user: [],
	userInfo: [],
	userStatus: 'loading',
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setAddFriend(state, action) {
			if (state.user) {
				state.user.friends = action.payload.friends
				// console.log(state.data.friends)
			} else {
				console.error('user friends non-existent :(')
			}
		},
	},
	extraReducers: {
		// get user
		[fetchUser.fulfilled]: (state, action) => {
			state.userInfo = action.payload
			state.postStatus = 'loaded'
		},
		[fetchUser.pending]: (state, action) => {
			state.userInfo = []
			state.postStatus = 'loading'
		},
		[fetchUser.rejected]: (state, action) => {
			state.userInfo = []
			state.postStatus = 'error'
		},

		// get user friends
		[fetchUserFriends.fulfilled]: (state, action) => {
			state.user = action.payload
			state.userStatus = 'loaded'
		},
		[fetchUserFriends.pending]: (state, action) => {
			state.user = []
			state.userStatus = 'loading'
		},
		[fetchUserFriends.rejected]: (state, action) => {
			state.user = []
			state.userStatus = 'error'
		},

		// addAndRemoveFriend
		[fetchAddFriend.fulfilled]: (state, action) => {
			state.user = action.payload
			state.userStatus = 'loaded'
		},
		[fetchAddFriend.pending]: (state, action) => {
			state.user = []
			state.userStatus = 'loading'
		},
		[fetchAddFriend.rejected]: (state, action) => {
			state.user = []
			state.userStatus = 'error'
		},
	},
})

export const usersReducer = usersSlice.reducer
export const { setAddFriend } = usersSlice.actions
