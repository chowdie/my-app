import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PlacedOrders from '../PlacedOrders/PlacedOrders'
import AcceptedOrders from '../AcceptedOrders/AcceptedOrders'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Homepage" />
    </ListItem>

    <ListItem button component={Link} to="/PlacedOrders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Placed Orders"  />
    </ListItem>

    <ListItem button component={Link} to="/AcceptedOrders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Accepted Orders"  />
    </ListItem>

    <ListItem button component={Link} to="/FinishedOrders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Finished Orders"  />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>

  
  </div>
);
