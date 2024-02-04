import React from 'react';
import Layout from '../components/Layout';
// import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SettingsPage = () => {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout title='SS | Settings' content='Settings Page'>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Setting Tabs"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Account" {...a11yProps(0)} />
                    <Tab label="Workspaces" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box>

                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box>
                        
                    </Box>
                </TabPanel>
            </Box>         
        </Layout>
    )
};

export default SettingsPage;