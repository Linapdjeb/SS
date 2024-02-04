import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';
import profileReducer from './features/profile';
import taskReducer from './features/task';
import workspaceReducer from './features/workspace';
import searchReducer from './features/search';

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        task: taskReducer,
        workspace: workspaceReducer,
        search: searchReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});