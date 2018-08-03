/**
 * Snackbar
 */
import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import { SnackbarContent } from 'material-ui/Snackbar';

//Componets
import PositionedSnackbar from './component/PositionSnackbar.js';
import DirectionSnackbar from './component/DirectionSnackbar.js';
import FadeSnackbar from './component/FadeSnackbar.js';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

export default class SnackbarComponent extends React.Component {
  // Simple Snackbar
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="snackbar-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.snackbar" />} match={this.props.match} />
        <div className="row">
          <RctCollapsibleCard
            colClasses="col-sm-12 col-md-12 col-xl-6"
            heading={<IntlMessages id="widgets.transitionControlDirection" />}
          >
              <DirectionSnackbar />
          </RctCollapsibleCard>
          <RctCollapsibleCard
            colClasses="col-sm-12 col-md-12 col-xl-6"
            heading={<IntlMessages id="widgets.simpleSnackbar" />}
          >
              <Button variant="raised" className="btn-primary text-white mr-10 mb-10 d-inline-block" onClick={this.handleClick}>simple snackbar</Button>
              <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                SnackbarContentProps={{ 'aria-describedby': 'message-id', }}
                message={<span id="message-id">Note archived</span>}
                action={[
                  <Button variant="raised" key="undo" className="btn-danger btn-sm text-white" dense onClick={this.handleClose}> UNDO </Button>,
                  <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose} >
                    <i className="zmdi zmdi-close"></i>
                  </IconButton>,
                ]}
              />
              <FadeSnackbar />
          </RctCollapsibleCard>
        </div>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.positionedSnackbar" />}
        >
            <PositionedSnackbar />
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.contexualColoredSnackbars" />}
        >
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-6">
                <SnackbarContent className="bg-primary mb-15" message="I Love Reactify Admin Theme." />
                <SnackbarContent className="bg-success mb-15" message="I Love Reactify Admin Theme." />
                <SnackbarContent className="bg-danger mb-15" message="I Love Reactify Admin Theme." />
              </div>
              <div className="col-sm-12 col-md-12 col-xl-6">
                <SnackbarContent className="bg-warning mb-15" message="I Love Reactify Admin Theme." />
                <SnackbarContent className="bg-secondary mb-15" message="I Love Reactify Admin Theme." />
                <SnackbarContent className="bg-info mb-15" message="I Love Reactify Admin Theme." />
              </div>
            </div>
        </RctCollapsibleCard>
      </div>
    );
  }
}
