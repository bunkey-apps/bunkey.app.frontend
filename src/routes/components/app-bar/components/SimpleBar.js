/**
 * Simple Bar App
 */
 import React from 'react';
 import AppBar from 'material-ui/AppBar';
 import Toolbar from 'material-ui/Toolbar';
 import IconButton from 'material-ui/IconButton';
 import MenuIcon from 'material-ui-icons/Menu';

const SimpleBar = () => (
  <AppBar position="static" className="bg-success">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <h5 className="mb-0">
        Project Name
      </h5>
    </Toolbar>
  </AppBar>
);

export default SimpleBar;
