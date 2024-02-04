import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { logout } from '../store/features/user';

import { styled, alpha, useTheme, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from '@mui/material/AppBar';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from "@mui/icons-material/MoreVert";

import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';

import { ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';

const Layout = ({ title, content, children }) => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const { isAuthenticated } = useSelector(state => state.user);

  const drawerWidth = 200;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    // alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Sidebar = (      
    <Drawer
      sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
      },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton href="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['space1', 'space2', 'Space3'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <Avatar sx={{ bgcolor: 'purple', height: 33, width: 33 }}>W</Avatar>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'purple', height: 33, width: 33 }}>PF</Avatar>
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
        </List>
    </Drawer>
  );
  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      width: '100%',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
  }));
    
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
    
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
    

  const [MoreAnchorEl, setMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(MoreAnchorEl);

  const handleMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };
  
  const MenuId = 'primary-create-menu';
  const renderMenu = (
    <Menu
      anchorEl='right'
      anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
      }}
      id={MenuId}
      keepMounted
      transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <p>Create Task</p>
      </MenuItem>
      <MenuItem>
        <p>Create Workspace</p>
      </MenuItem>
    </Menu>
  );

  const authLinks = (
    <>
      <Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={MenuId}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>

        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          // onClick={() => Navigate(`/profile/4${id}`)}
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="log out"
          color="inherit"
          onClick={() => dispatchEvent(logout())}
        >
          <LogoutIcon/>
        </IconButton>
      </Box>
        
      {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
        size="large"
        aria-label="show more"
        aria-controls={MenuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box> */}
    </>
  );

  const guestLinks = (
    <Box sx={{ display: { xs: "none", md: "flex"}, marginLeft: "auto" }}>
      <Button color="inherit" href="/login">Login</Button>
      <Button color="inherit" href="/register">Register</Button>
    </Box>
  );


  function Copyright() {
    return (
      <Typography variant="body2" color="secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Squad Skullduggery
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
  };

  const { innerHeight: height } = window;
  const hgt = height -55


  return (
    <ThemeProvider theme={darkTheme}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Helmet>

      <Box sx={{display: 'flex', minHeight: hgt}}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              {true &&  (open ?
                <IconButton color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={handleDrawerClose}
                >
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton> 
                : <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
              )}
                
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Squad Skullduggery
              </Typography>
              {true ? authLinks : guestLinks}
            </Toolbar>
          </AppBar>
          {renderMenu}
        </Box>
        {Sidebar}

        <Main open={open}>
          <DrawerHeader />
          <Box sx={{ display: 'flex', marginLeft: "auto" }}>
            {children}
          </Box>
        </Main>

      </Box>
    
      <Box 
        component="footer" 
        sx={{ 
          py: 2,
          px: 2,
          mt: 'auto',
          position: 'center',
          width: '100%',
          justifyContent: "center",
        }}
      >
        <Copyright />
      </Box>

    </ThemeProvider> 
  )
};

export default Layout;