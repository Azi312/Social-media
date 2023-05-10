import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
// 	const { data } = await axios.get('/posts')
// 	return data
// })

export const fetchUserPosts = createAsyncThunk(
	'auth/fetchUserPosts',
	async params => {
		const { userId } = params
		const { data } = await axios.get(`/users/${userId}/posts`)
		return data
	}
)

export const fetchLikePost = createAsyncThunk(
	'auth/fetchLikePost',
	async params => {
		const { postId, userId } = params
		const { data } = await axios.patch(`/posts/${postId}/like`, { userId })
		return data
	}
)

const initialState = {
	posts: [],
	postStatus: 'loading',
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		removePost: (state, action) => {
			state.posts = state.posts.filter(obj => obj._id !== action.payload)
		},
	},
	extraReducers: {
		// get all posts
		// [fetchPosts.fulfilled]: (state, action) => {
		// 	state.posts = action.payload
		// 	state.postStatus = 'loaded'
		// },
		// [fetchPosts.pending]: (state, action) => {
		// 	state.posts = []
		// 	state.postStatus = 'loading'
		// },
		// [fetchPosts.rejected]: (state, action) => {
		// 	state.posts = []
		// 	state.postStatus = 'error'
		// },

		// like post
		[fetchLikePost.fulfilled]: (state, action) => {
			const { postId, userId } = action.payload
			const postIndex = state.posts.findIndex(obj => obj._id === postId)
			const post = state.posts[postIndex]
			const userIndex = post.likes.findIndex(obj => obj === userId)
			if (userIndex === -1) {
				post.likes.push(userId)
			} else {
				post.likes.splice(userIndex, 1)
			}
		},

		// get user posts
		[fetchUserPosts.fulfilled]: (state, action) => {
			state.posts = action.payload
			state.postStatus = 'loaded'
		},
		[fetchUserPosts.pending]: (state, action) => {
			state.posts = []
			state.postStatus = 'loading'
		},
		[fetchUserPosts.rejected]: (state, action) => {
			state.posts = []
			state.postStatus = 'error'
		},
	},
})

export const postsReducer = postsSlice.reducer
export const { removePost } = postsSlice.actions
