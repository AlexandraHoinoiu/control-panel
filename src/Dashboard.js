import React from 'react';
import "./dashboard.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { mainListItems } from './listItems';

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  }
  return (
    <div className="root">
      <CssBaseline />
      <AppBar position="absolute" className="appBar appBarShift">
        <Toolbar className="toolbar">
          <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <h6>Logout</h6>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" className="drawerPaper">
        <List className="listMenu">{mainListItems}</List>
      </Drawer>
    </div>
  );
}

