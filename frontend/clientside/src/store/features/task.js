import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    task: null,
    loading: false,
};


export const createTask = createAsyncThunk('task/create', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch('/api/task/create', {
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


export const getTask = createAsyncThunk('task', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/task/${arg.task_id}`, {
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


export const editTask = createAsyncThunk('task/edit', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/task/edit/${arg.task_id}`, {
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


export const deleteTask = createAsyncThunk('task/delete', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/task/delete/${arg.task_id}`, {
			method: 'DELETE',
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



const taskSlice = createSlice({
    name: 'task',
	initialState,
	reducers: {
        resetTask: state => {
            state.task = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createTask.pending, state => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, state => {
                state.loading = false;
            })
            .addCase(createTask.rejected, state => {
                state.loading = false;
            })
            .addCase(getTask.pending, state => {
                state.loading = true;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.loading = false;
                state.task = action.payload;
            })
            .addCase(getTask.rejected, state => {
                state.loading = false;
            })
            .addCase(editTask.pending, state => {
                state.loading = true;
            })
            .addCase(editTask.fulfilled, state => {
                state.loading = false;
            })
            .addCase(editTask.rejected, state => {
                state.loading = false;
            })
            .addCase(deleteTask.pending, state => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, state => {
                state.loading = false;
                state.task = null;
            })
            .addCase(deleteTask.rejected, state => {
                state.loading = false;
            })
    }
});

export default taskSlice.reducer;