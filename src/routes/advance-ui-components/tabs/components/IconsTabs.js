/**
 * Icons Tabs
 */
import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

class IconsTabs extends Component {

    state = {
        activeTab: 0
    }

    handleChange(value) {
        this.setState({ activeTab: value });
    }

    render() {
        const { activeTab } = this.state;
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.iconsTabs" />}
            >
                <Tabs
                    value={activeTab}
                    onChange={(e, value) => this.handleChange(value)}
                    fullWidth
                    indicatorColor="accent"
                    textColor="inherit">
                    <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-phone"></i>} />
                    <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-favorite"></i>} />
                    <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-account-box"></i>} />
                </Tabs>
            </RctCollapsibleCard>
        );
    }
}

export default IconsTabs;
