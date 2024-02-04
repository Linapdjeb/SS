import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CreateTask } from '../store/features/task';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SignalWifiStatusbarNull } from '@mui/icons-material';

const CreateTask = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});

    const { workspace } = formData;

    const formChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmit = e => {
		e.preventDefault();

		dispatch(CreateTask({ }));
	};

    const currencies = [ 
        'Low',
        'Normal',
        'High',
        'Urgent',
    ];

    const people = [
        'this guy',
        'this mf',
        'queeen',
    ];

    return (
        <Box>
            <form onSubmit={(e) => formSubmit(e)} method='POST'>
                <Stack
                    component="form"
                    sx={{
                        width: '50ch',
                    }}
                    spacing={3}
                    alignItems="center" 
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant='h5'>Add Task:</Typography>
                    <FormControl sx={{ width: '40ch' }} variant='standard' required>
                        <TextField
                            required
                            label='Title'
                            name='title'
                            type='text'
                            variant='standard'
                            value={title}
                            onChange={(e) => FormChange(e)}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '40ch' }} variant='standard' required>
                        <FormControlLabel control={
                            <Switch 
                                label='Private'
                                checked={is_private}
                                onChange={(e) => FormChange(e)}
                                inputProps={{ 'aria-label': 'controlled' }} 
                            />
                        } label={
                            is_private == true ? (<LockIcon />) : (<PublicIcon />)
                        } />
                    </FormControl>

                    <FormControl sx={{ width: '40ch' }} variant='standard'>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={4}
                            value={description}
                            onChange={(e) => FormChange(e)}
                            variant="standard"
                        />
                    </FormControl>

                    <FormControl sx={{ width: '40ch' }} variant='standard'>
                        <TextField
                            required
                            label='Category'
                            name='caterogy'
                            type='bruh'
                            variant='standard'
                            value={bruh}
                            onChange={(e) => FormChange(e)}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '40ch' }} variant='standard'>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            value={priority}
                            onChange={(e) => FormChange(e)}
                            helperText="Please select Priority"
                            variant="standard"
                        >
                            {currencies.map((text, index) => (
                                <MenuItem key={index} value={text}>
                                    {text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ width: '40ch' }} variant='standard'>
                        <TextField
                            id="standard-select"
                            select
                            label="Workspace"
                            value={workspace}
                            onChange={(e) => FormChange(e)}
                            helperText="Please select workspace"
                            variant="standard"
                        >
                            {workspace.map((text, index) => (
                                <MenuItem key={index} value={text}>
                                    {text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ width: '40ch' }} variant='standard'>
                        <TextField
                            id="standard-select"
                            select
                            label="Assigned to"
                            value={assigned_to}
                            onChange={(e) => FormChange(e)}
                            helperText="Please select person"
                            variant="standard"
                            // {workspace == null && (disable='true')}
                            // .trim().length !== 0
                        >
                            {people.map((text, index) => (
                                <MenuItem key={index} value={text}>
                                    {text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    
                    <FormControl sx={{ width: '40ch' }} variant='standard'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disableFuture
                                label="Responsive"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={due_date}
                                onChange={(e) => FormChange(e)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    {/* the rest... */}

                    <Button sx={{ width: '20ch' }} variant='outlined' color='secondary' type='submit'>Log In</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default CreateTask;