/**
* Feedback Page
*/
/* eslint-disable */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

// components
import FeedbacksListing from './components/FeedbacksListings';
import AddNewFeedback from './components/AddNewFeedback';
import FeedbackDetail from './components/FeedbackDetail';
import SearchIdeas from './components/SearchIdeas';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// actions
import { onChangeFeedbackPageTabs, getFeedbacks } from '../../../actions';

// For Tab Content
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class FeedbackPage extends Component {

  componentWillMount() {
    this.props.getFeedbacks();
  }

  handleChange = (event, value) => {
    this.props.onChangeFeedbackPageTabs(value);
  }

  render() {
    const { selectedTab, selectedFeedback, loading, totalFeedbacksCount, plannedFeedbacksCount, progressFeedbacksCount } = this.props;
    return (
      <div className="feedback-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.feedback" />} match={this.props.match} />
        {selectedFeedback === null ?
          <div>
            <SearchIdeas />
            <RctCollapsibleCard customClasses="rct-tabs">
              {loading &&
                <div className="d-flex justify-content-center loader-overlay">
                  <CircularProgress />
                </div>
              }
              <AppBar position="static">
                <Tabs value={selectedTab} onChange={this.handleChange} scrollable scrollButtons="off">
                  <Tab label={`All (${totalFeedbacksCount})`} />
                  <Tab label={`Planned (${plannedFeedbacksCount})`} />
                  <Tab label={`In Progress (${progressFeedbacksCount})`} />
                  <Tab label="Add New" />
                </Tabs>
              </AppBar>
              {selectedTab === 0 && <TabContainer><FeedbacksListing /></TabContainer>}
              {selectedTab === 1 && <TabContainer><FeedbacksListing /></TabContainer>}
              {selectedTab === 2 && <TabContainer><FeedbacksListing /></TabContainer>}
              {selectedTab === 3 &&
                <TabContainer>
                  <AddNewFeedback />
                </TabContainer>}
            </RctCollapsibleCard>
          </div>
          : <FeedbackDetail />
        }
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ feedback }) => {
  return feedback;
}

export default connect(mapStateToProps, {
  onChangeFeedbackPageTabs,
  getFeedbacks
})(FeedbackPage);
