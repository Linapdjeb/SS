import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { resetRegistered, login  } from '../store/features/user';
import Layout from '../components/Layout';

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
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const LoginPage = () => {
    const dispatch = useDispatch();
	const { loading, isAuthenticated, registered } = useSelector(
		state => state.user
	);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (registered) dispatch(resetRegistered());
	}, [registered]);

	const { email, password } = formData;

	const FormChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmit = async e => {
		e.preventDefault();

		dispatch(login({ email, password }));
	};

	// pw visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


	if (isAuthenticated) return <Navigate to='/dashboard' />;

	const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Layout title='SS | Login' content='Login Page'>
            
            {/* {loading ? spinner : form} */}

			<Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
				<div>
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
						<Typography variant='h5'>Sign in:</Typography>
						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<TextField
								required
								label='Email Address'
								name='email'
								type='email'
								variant='standard'
								value={email}
								autoFocus
								onChange={(e) => FormChange(e)}
							/>
						</FormControl>

						<FormControl sx={{ width: '40ch' }} variant='standard' required>
							<InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
							<Input
								id='standard-adornment-password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={password}
								onChange={(e) => FormChange(e)}
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
						<Button sx={{ width: '20ch' }} variant='outlined' color='secondary' type='submit' onSubmit={(e) => formSubmit(e)}>Log In</Button>
						<Typography>
							Don't have an account? <Link to='/register'>Sign Up</Link>
						</Typography>
					</Stack>
				</div>
        	</Box>

        </Layout>
    )
}

export default LoginPage;