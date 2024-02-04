import React from 'react';
import Paper from '@mui/material/Paper';
import Image from './img/SkullBg.gif';

const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`
    }
};


const Spinner = () => (
    <Paper style={styles.paperContainer}>
        Some text to fill the Paper Component
    </Paper>
);

export default Spinner;