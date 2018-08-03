import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default class MultiSelect extends React.Component {
  state = {
    name: [],
  };
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <form autoComplete="off">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-xl-4">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple">Name</InputLabel>
                <Select multiple value={this.state.name} onChange={this.handleChange}
                  input={<Input id="select-multiple" />}
                  MenuProps={MenuProps} >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-4">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                <Select multiple value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={this.state.name === name} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-4">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                <Select
                  multiple
                  value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div>
                      {selected.map(value => <Chip key={value} label={value} />)}
                    </div>
                  )} MenuProps={MenuProps}>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
