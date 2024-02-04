import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	registered: false,
};


export const register = createAsyncThunk('accounts/register', async({ first_name, last_name, email, password }, thunkAPI) => {
	const body = JSON.stringify({
		first_name,
		last_name,
		email,
		password,
	}); // const body = JSON.stringify(arg)

	try {
		const res = await fetch('/api/accounts/register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await res.json();

		if (res.status === 201) {
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}

	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});


export const login = createAsyncThunk('accounts/login', async ({ email, password }, thunkAPI) => {
	const body = JSON.stringify({
		email,
		password,
	});

	try {
		const res = await fetch('/api/accounts/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await res.json();

		if (res.status === 200) {
			const { dispatch } = thunkAPI;

			dispatch(getUser());

			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});


const getUser = createAsyncThunk('accounts/me', async (_, thunkAPI) => {
	try {
		const res = await fetch('/api/accounts/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		const data = await res.json();

		if (res.status === 200) {
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});


export const checkAuth = createAsyncThunk('accounts/verify', async (_, thunkAPI) => {
	try {
		const res = await fetch('/api/accounts/verify', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		const data = await res.json();

		if (res.status === 200) {
			const { dispatch } = thunkAPI;

			dispatch(getUser());

			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});


export const logout = createAsyncThunk('accounts/logout', async (_, thunkAPI) => {
	try {
		const res = await fetch('/api/accounts/logout', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		const data = await res.json();

		if (res.status === 200) {
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});


const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
        resetRegistered: state => {
            state.registered = false;
        }
    },
    extraReducers: builder => {
        builder
			.addCase(register.pending, state => {
				state.loading = true;
			})
			.addCase(register.fulfilled, state => {
				state.loading = false;
				state.registered = true;
			})
			.addCase(register.rejected, state => {
				state.loading = false;
				// to expand u can add error to the initaial state
				// and change error in this case and display it as alert or smt
			})
			.addCase(login.pending, state => {
				state.loading = true;
			})
			.addCase(login.fulfilled, state => {
				state.loading = false;
				state.isAuthenticated = true;
			})
			.addCase(login.rejected, state => {
				state.loading = false;
			})
			.addCase(getUser.pending, state => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, state => {
				state.loading = false;
			})
			.addCase(checkAuth.pending, state => {
				state.loading = true;
			})
			.addCase(checkAuth.fulfilled, state => {
				state.loading = false;
				state.isAuthenticated = true;
			})
			.addCase(checkAuth.rejected, state => {
				state.loading = false;
			})
			.addCase(logout.pending, state => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, state => {
				state.loading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(logout.rejected, state => {
				state.loading = false;
			});
    }
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;