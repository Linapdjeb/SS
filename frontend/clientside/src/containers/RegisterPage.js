import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../store/features/user';

import {
    Box, 
	Stack,
    TextField,
    FormControl,
    Button,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const RegisterPage = () => {
    const dispatch = useDispatch();
    const { registered, loading } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: ''
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const formChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmit = e => {
		e.preventDefault();

		dispatch(register({ first_name, last_name, email, password }));
	};

    if (registered) return <Navigate to='/login' />;

	// pw visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

	const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
	

    return (
        <Layout title='SS | Register' content='Register Page'>
			<Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
				<form onSubmit={e => formSubmit(e)} method='POST'>
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
						<Typography variant='h5'>
							Sign up:
						</Typography>
						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<TextField
								required
								label='First Name'
								name='first_name'
								type='text'
								helperText='Please enter your first name'
								variant='standard'
								value={first_name}
								onChange={e => formChange(e)}
							/>
						</FormControl>
						
						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<TextField
								required
								label='Last Name'
								name='last_name'
								type='text'
								helperText='Please enter your last name'
								variant='standard'
								value={last_name}
								onChange={e => formChange(e)}
							/>
						</FormControl>
						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<TextField
								required
								label='Email Address'
								name='email'
								type='email'
								variant='standard'
								value={email}
								onChange={e => formChange(e)}
							/>
						</FormControl>
						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
							<Input
								id='standard-adornment-password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={password}
								onChange={e => formChange(e)}
								endAdornment={
								<InputAdornment position='end'>
									<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									>
									{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
								}
							/>
						</FormControl>
						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<InputLabel htmlFor='standard-adornment-password'>Confirm Password</InputLabel>
							<Input
								id='standard-adornment-password'
								type={showPassword ? 'text' : 'password'}
								name='re_password'
								value={re_password}
								onChange={e => formChange(e)}
								endAdornment={
								<InputAdornment position='end'>
									<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									>
									{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
								}
							/>
						</FormControl>
						<Button sx={{ width: '20ch' }} color='secondary'  type='submit'>Sign Up</Button>
						<Typography variant='body1'>
							have an account? <Link to='/login'>Login</Link>
						</Typography>
					</Stack>
				</form>
			</Box>
        </Layout>
    )
};

export default RegisterPage;