/**
 * Blank Page
 */
/* eslint-disable */
import React, { Component } from 'react';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card test
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

export default class Blank extends Component {
  render() {
    return (
      <div className="blank-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.blank" />} match={this.props.match} />
      </div>
    );
  }
}
