/**
* Advanced Panel
*/
/* eslint-disable */
import React from 'react';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

class AdvancedPanel extends React.Component {
  state = {
    expanded: null,
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  render() {
    return (
      <div>
        <ExpansionPanel defaultExpanded className="bg-info text-white">
          <ExpansionPanelSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
            <div className="col-md-3">
              <Typography className="text-white">Location</Typography>
            </div>
            <div className="col-md-3">
              <Typography className="text-white">Select trip destination</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="col-md-3" />
            <div className="col-md-3">
              <Chip label="Barbados" className="bg-warning text-white" onDelete={() => { }} />
            </div>
            <div className="col-md-3">
              <Typography type="caption">
                Select your destination of choice<br />
                <a href="javascript:void(0);">Learn more</a>
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button raised="true" className="btn-primary text-white">Cancel</Button>
            <Button raised="true" className="btn-danger text-white">Save</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

export default AdvancedPanel;
