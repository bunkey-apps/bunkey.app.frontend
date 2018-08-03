/**
 * With Disable Tab
 */
import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

class WithDisableTab extends Component {

    state = {
        activeIndex: 0
    }

    handleChange(value) {
        this.setState({ activeIndex: value });
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.withDisableTabs" />}
            >
                <Tabs
                    value={activeIndex}
                    indicatorColor="white"
                    textColor="inherit"
                    className="bg-primary"
                    onChange={(e, value) => this.handleChange(value)}>
                    <Tab label="Active" />
                    <Tab label="Disabled" disabled />
                    <Tab label="Active" />
                </Tabs>
            </RctCollapsibleCard>
        );
    }
}

export default WithDisableTab;
