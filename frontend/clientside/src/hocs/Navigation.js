import React from 'react';
import { Route, Routes } from 'react-router-dom';


import DashboardPage from '../containers/DashboadPage';
import LandingPage from '../containers/LandingPage';
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';
import NotFoundPage from '../containers/NotFoundPage';
import SearchPage from '../containers/SearchPage';
import ProfilePage from '../containers/ProfilePage';
import SettingsPage from '../containers/SettingsPage';
import WorkspacePage from '../containers/WorkspacePage';

export const Navigation = () => {
    return (
        <Routes>
            <Route path='/Enter' element={<LandingPage/>} />
            <Route path='/Register' element={<RegisterPage/>} />
            <Route path='/Login' element={<LoginPage/>} />
            <Route path='/' element={<DashboardPage/>} />
            <Route path='/Dashboard' element={<DashboardPage/>} />
            <Route path='/Search?q=:search' element={<SearchPage />} /> 
            <Route path='/Profile/:id' element={<ProfilePage />} />
            <Route path='/Settings' element={<SettingsPage />} />
            <Route path='/Workspace/:title' element={<WorkspacePage />} />


            <Route path='*' element={<NotFoundPage/>} />
        </Routes>
    )
};
