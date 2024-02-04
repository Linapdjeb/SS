import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    profile: null,
    loading: false,
};


export const createProfile = createAsyncThunk('profile/create', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch('/api/accounts/profile/me', {
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


export const meProfile = createAsyncThunk('profile/me', async(arg, thunkAPI) => {

    try {
		const res = await fetch('/api/accounts/profile/me', {
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


export const getProfile = createAsyncThunk('profile', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/accounts/profile/${arg.profile_id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
                'Content-Type': 'application/json',
			},
            body
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


export const editProfile = createAsyncThunk('profile/edit', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch('/api/accounts/profile/me', {
			method: 'PUT',
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


const profileSlice = createSlice({
    name: 'profile',
	initialState,
	reducers: {
        resetProfile: state => {
            state.profile = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createProfile.pending, state => {
                state.loading = true;
            })
            .addCase(createProfile.fulfilled, state => {
                state.loading = false;
            })
            .addCase(createProfile.rejected, state => {
                state.loading = false;
            })
            .addCase(meProfile.pending, state => {
                state.loading = true;
            })
            .addCase(meProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(meProfile.rejected, state => {
                state.loading = false;
            })
            .addCase(getProfile.pending, state => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, state => {
                state.loading = false;
            })
            .addCase(editProfile.pending, state => {
                state.loading = true;
            })
            .addCase(editProfile.fulfilled, state => {
                state.loading = false;
            })
            .addCase(editProfile.rejected, state => {
                state.loading = false;
            })
    }
});

export default profileSlice.reducer;
