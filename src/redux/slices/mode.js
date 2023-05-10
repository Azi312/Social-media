import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	mode: 'light',
}

const modeSlice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		setMode: (state, action) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light'
		},
	},
})

export const modeReducer = modeSlice.reducer
export const { setMode } = modeSlice.actions
