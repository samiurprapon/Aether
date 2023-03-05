import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const init = {
	isAuthenticated: false,
};

export const login = createAsyncThunk('auth/login', async (payload: any) => {
	return await axios
		.post('/login', payload)
		.then((response) => response.data)
		.catch((error) => error.response.data);
});

export const authSlice = createSlice({
	name: 'auth',
	initialState: init,
	reducers: {
		changeAuthState: (state) => {
			state.isAuthenticated = !state.isAuthenticated;
		},
		getAuthState: (state) => {
			state.isAuthenticated = !!localStorage.getItem('token');
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (action.payload.token) {
				localStorage.setItem('token', action.payload.token);
				state.isAuthenticated = true;
			}
		});
	},
});

export const { changeAuthState, getAuthState } = authSlice.actions;

export default authSlice.reducer;
