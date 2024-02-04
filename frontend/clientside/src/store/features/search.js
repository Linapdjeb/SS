import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    result: null,
    people: null,
    loading: false,
};


export const search = createAsyncThunk('search', async(arg, thunkAPI) => {
    const body = JSON.stringify({arg});


    try {
        const res = await fetch(`/api/search?q=${arg.search}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
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


export const peopleSearch = createAsyncThunk('search/people', async(arg, thunkAPI) => {
    const body = JSON.stringify({arg});


    try {
        const res = await fetch(`/api/search?q=${arg.search}/people`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
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


const searchSlice = createSlice({
    name: 'search',
	initialState,
	reducers: {
        setSearch: state => {
            state.result = null;
        },
        setPeople: state => {
            state.people = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(search.pending, state => {
                state.loading = true;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(search.rejected, state => {
                state.loading = false;
            })
            .addCase(peopleSearch.pending, state => {
                state.loading = true;
            })
            .addCase(peopleSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.people = action.payload;
            })
            .addCase(peopleSearch.rejected, state => {
                state.loading = false;
            })
    }
});

export default searchSlice.reducer;