import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const customTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useMemo(
        () => createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode]
    );

}


