/**
* Bar With Button
*/
import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

 const styles = {
   root: {
     width: '100%',
   },
   flex: {
     flex: 1,
   },
   menuButton: {
     marginLeft: -12,
     marginRight: 20,
   },
 };
function BarWithButton(props) {
  const { classes } = props;
  return (
    <AppBar position="static" className="bg-info">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          Title
          </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(BarWithButton);
