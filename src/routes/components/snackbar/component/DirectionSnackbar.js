/*====== Transition Snackbar =======*/
import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

function TransitionLeft(props) {
  return <Slide direction="left" {...props} />;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

function TransitionRight(props) {
  return <Slide direction="right" {...props} />;
}

function TransitionDown(props) {
  return <Slide direction="down" {...props} />;
}

class DirectionSnackbar extends React.Component {
  state = {
    open: false,
    transition: null,
  };

  handleClick = transition => () => {
    this.setState({ open: true, transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="raised" className="btn-success text-white mr-15 mb-10" onClick={this.handleClick(TransitionLeft)}>Right</Button>
        <Button variant="raised" className="btn-warning text-white mr-15 mb-10" onClick={this.handleClick(TransitionUp)}>Up</Button>
        <Button variant="raised" className="btn-danger text-white mr-15 mb-10" onClick={this.handleClick(TransitionRight)}>Left</Button>
        <Button variant="raised" className="btn-primary text-white mr-15 mb-10" onClick={this.handleClick(TransitionDown)}>Down</Button>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          transition={this.state.transition}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default DirectionSnackbar;
