import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import ReportIcon from '@material-ui/icons/Report';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Link } from "react-router-dom"


export const mainListItems = (
  <div>
    <ListItem>
      <img src="logo.png" className="logo" alt=""></img>
    </ListItem>
    <br />
    
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <FilterNoneIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
    </Link>

    <Link to="/reports">
      <ListItem button>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </Link>

    <Link to="/users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>

    <Link to="/supervisors">
      <ListItem button>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Supervisors" />
      </ListItem>
    </Link>
  </div>
);