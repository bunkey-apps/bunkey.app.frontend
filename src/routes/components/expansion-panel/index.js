/**
 * Expansion Panel
 */
import React from 'react';

// components
import SimplePanel from './components/SimplePanel';
import ControlledPanel from './components/ControlledPanel';
import AdvancedPanel from './components/AdvancedPanel';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

class ControlledExpansionPanels extends React.Component {

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
      <div className="panel-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.expansionPanel" />} match={this.props.match} />
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.simpleExpansionPanel" />}
        >
          <SimplePanel />
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.controlledAccordion" />}
        >
          <ControlledPanel />
        </RctCollapsibleCard>
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.secondaryHeadingAndColumns" />}
        >
            <AdvancedPanel />
        </RctCollapsibleCard>
      </div>
    );
  }
}

export default ControlledExpansionPanels;
