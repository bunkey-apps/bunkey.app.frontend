/**
 * Confirmation Dialog
 */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
];

class ConfirmationDialog extends React.Component {
  state = {
    value: undefined,
  };

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ value: nextProps.value });
    }
  }

  radioGroup = null;

  handleEntering = () => {
    this.radioGroup.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog disableBackdropClick disableEscapeKeyDown
        maxWidth="sm" onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}>
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
            }}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}>
            {options.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button raised="true" size="small" onClick={this.handleCancel} className="btn-danger text-white">
            Cancel
          </Button>
          <Button raised="true" size="small" onClick={this.handleOk} className="btn-primary text-white">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

export default class ConfirmDialog extends React.Component {
  state = {
    open: false,
    value: 'Dione',
  };

  button = undefined;

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  render() {
    return (
      <div>
        <List>
          <ListItem button divider disabled>
            <ListItemText primary="Interruptions" />
          </ListItem>
          <ListItem button divider aria-haspopup="true" aria-controls="ringtone-menu"
            aria-label="Phone ringtone" onClick={this.handleClickListItem}>
            <ListItemText primary="Phone ringtone" secondary={this.state.value} />
          </ListItem>
          <ListItem button divider disabled>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
          <ConfirmationDialog
            open={this.state.open}
            onClose={this.handleClose}
            value={this.state.value}
          />
        </List>
      </div>
    );
  }
}
