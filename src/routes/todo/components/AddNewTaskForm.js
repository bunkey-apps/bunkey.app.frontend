import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';
import Dialog, {
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const labels = [
   'Frontend',
   'Backend',
   'Api',
   'Issue'
];

class AddNewTaskForm extends Component {
   render() {
      return (
         <Dialog
            open={this.props.visible}
            onClose={this.props.closeModal}
            aria-labelledby="form-dialog-title"
         >
            <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  To add new task add the following details in this section.
                  </DialogContentText>
               <TextField
                  margin="dense"
                  id="task-name"
                  label="Task Name"
                  type="text"
                  fullWidth
               />
               <FormControl>
                  <InputLabel htmlFor="select-multiple-chip">Name</InputLabel>
                  <Select
                     multiple
                     value={this.props.labels}
                     onChange={this.props.onSelectLabel}
                     input={<Input id="select-multiple-chip" />}
                     renderValue={selected => (
                        <div>
                           {selected.map(value => <Chip key={value} label={value} />)}
                        </div>
                     )}
                  >
                     {labels.map(name => (
                        <MenuItem
                           key={name}
                           value={name}
                        >
                           {name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </DialogContent>
            <DialogActions>
               <Button onClick={this.props.closeModal} color="primary">
                  Cancel
                  </Button>
               <Button onClick={this.props.closeModal} color="primary">
                  Add
                  </Button>
            </DialogActions>
         </Dialog>
      );
   }
}

export default AddNewTaskForm;
