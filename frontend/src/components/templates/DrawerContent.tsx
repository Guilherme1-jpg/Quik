import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useAuth from 'hooks/useAuth';

const DrawerContent = () => {
  const { signout } = useAuth();

  const handleLogout = () => {
    signout();
    window.location.href = '/';
  };
  
  return (
    <>
      <List>
        <ListItem button>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItem>
      </List>
    </>
  );
};

export default DrawerContent;
