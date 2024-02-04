import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    workspace: null,
    archived: null,
    loading: false,
};


export const createWorkspace = createAsyncThunk('Workspace/create', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch('/api/workspace/create', {
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


export const addPeople = createAsyncThunk('workspace/add-people', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/workspace/add-people/${arg.workspace_id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await res.json();

		if (res.status === 201) {
            const { dispatch } = thunkAPI;

            dispatch(getWorkspace({'workspace_id': arg.workspace_id}));

			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}

	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});


export const getWorkspace = createAsyncThunk('Workspace', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/workspace/${arg.workspace_id}`, {
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


export const editWorkspace = createAsyncThunk('Workspace/edit', async(arg, thunkAPI) => {
    const body = JSON.stringify(arg)

    try {
		const res = await fetch(`/api/workspace/edit/${arg.workspace_id}`, {
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


export const archivedWorkspaces = createAsyncThunk('Workspace/archived', async(arg, thunkAPI) => {

    try {
		const res = await fetch('/api/workspace/archived', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
                'Content-Type': 'application/json',
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



const searchSlice = createSlice({
    name: 'workspace',
	initialState,
	reducers: {
        resetWorkspace: state => {
            state.workspace = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(createWorkspace.pending, state => {
            state.loading = true;
        })
        .addCase(createWorkspace.fulfilled, state => {
            state.loading = false;
        })
        .addCase(createWorkspace.rejected, state => {
            state.loading = false;
        })
        .addCase(addPeople.pending, state => {
            state.loading = true;
        })
        .addCase(addPeople.fulfilled, state => {
            state.loading = false;
        })
        .addCase(addPeople.rejected, state => {
            state.loading = false;
        })
        .addCase(getWorkspace.pending, state => {
            state.loading = true;
        })
        .addCase(getWorkspace.fulfilled, (state, action) => {
            state.loading = false;
            state.workspace = action.payload;
        })
        .addCase(getWorkspace.rejected, state => {
            state.loading = false;
        })
        .addCase(editWorkspace.pending, state => {
            state.loading = true;
        })
        .addCase(editWorkspace.fulfilled, state => {
            state.loading = false;
        })
        .addCase(editWorkspace.rejected, state => {
            state.loading = false;
        })
        .addCase(archivedWorkspaces.pending, state => {
            state.loading = true;
        })
        .addCase(archivedWorkspaces.fulfilled, (state, action) => {
            state.loading = false;
            state.archived = action.payload;
        })
        .addCase(archivedWorkspaces.rejected, state => {
            state.loading = false;
        })
    }
});

export default searchSlice.reducer;