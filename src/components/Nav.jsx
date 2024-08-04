"use client";
import { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';


const Nav = () => {
  const { user, signOut } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    router.push('/signin');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} color="inherit" component={Link} href="/">
          Pantry Management
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} href="/list">
            List
          </Button>
          <Button color="inherit" component={Link} href="/search">
            Search
          </Button>
          <Button color="inherit" component={Link} href="/add">
            Add Item
          </Button>
          {user ? (
            <>
              <Button color='inherit'>
                {user.email}
              </Button>
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/signin">
                Sign In
              </Button>
              <Button color="inherit" component={Link} href="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} href="/list">
              List
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/search">
              Search
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/add">
              Add Item
            </MenuItem>
            {user ? (
              <>
                <MenuItem>{user.email}</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleClose} component={Link} href="/signin">
                  Sign In
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} href="/signup">
                  Sign Up
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
