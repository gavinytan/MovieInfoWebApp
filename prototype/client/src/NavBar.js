import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function LoginLogoutButton() {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return <Button variant="contained" disableElevation sx={{fontWeight: 'bold' }}>Logout</Button>
  } else {
    return <Button variant="contained" disableElevation sx={{fontWeight: 'bold' }}>Login</Button>
  }
}
export default function NavBar() {
  return (
      <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Button variant="contained" disableElevation sx={{fontWeight: 'bold' }}>Home</Button>
          <LoginLogoutButton />
          <Button variant="contained" disableElevation sx={{fontWeight: 'bold' }}>My Movies</Button>
        </Toolbar>
      </AppBar>
      </React.Fragment>
  );
}