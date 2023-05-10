import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './slices/posts'
import { authReducer } from './slices/auth'
import { useDispatch } from 'react-redux'
import { modeReducer } from './slices/mode'
import { usersReducer } from './slices/users'

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer,
		auth: authReducer,
		mode: modeReducer,
	},
})
// type AppDispatch = typeof store.dispatch

// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export type RootState = ReturnType<typeof store.getState>
