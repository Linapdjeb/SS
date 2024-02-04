import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { meProfile } from '../store/features/profile';

import Task from '../components/Task';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


const DashboardPage = () => {
    // const { user, isAuthenticated } = useSelector(state => state.user);
    // const { profile, loading } = useSelector(state => state.profile);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(meProfile())
    // }, [dispatch])

    // if (!isAuthenticated && !loading && user === null) return <Navigate to='/login' />;
    
    

    return (
        <Layout title='SS | Dashboard' content='Dashboard Page'>
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    {['Profile', 'Settings', 'logout'].map((text, index) => (
                        <Task key={index} />
                    ))}
                </Stack>
            </Box>
        </Layout>
    )
}

export default DashboardPage;