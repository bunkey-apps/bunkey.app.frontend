/**
 * App Bar Component
 */
/* eslint-disable */
import React from 'react';

// Components
import SimpleBar from './components/SimpleBar';
import BarWithButton from './components/BarWithButton';
import CustomBar from './components/CustomBar';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';


// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

function AppBar(props) {
  return (
    <div className="appbar-wrapper">
      <PageTitleBar title={<IntlMessages id="sidebar.appBar" />} match={props.match} />
      <div className="row">
        <RctCollapsibleCard
          colClasses="col-sm-12 col-md-12 col-xl-6"
          heading={<IntlMessages id="widgets.Simple App Bars" />}
        >
          <SimpleBar />
        </RctCollapsibleCard>
        <RctCollapsibleCard
          colClasses="col-sm-12 col-md-12 col-xl-6"
          heading={<IntlMessages id="widgets.appBarsWithButtons" />}
        >
          <BarWithButton />
        </RctCollapsibleCard>
      </div>
      <RctCollapsibleCard
        heading={<IntlMessages id="widgets.appBarsWithButtons" />}
      >
        <CustomBar />
      </RctCollapsibleCard>
    </div>
  );
}

export default AppBar;
