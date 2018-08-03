/**
 * Icon With Label
 */
import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

class IconWithLabel extends Component {

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
                heading={<IntlMessages id="widgets.iconWithLabel" />}
            >
                <Tabs
                    value={activeIndex}
                    onChange={(e, value) => this.handleChange(value)}
                    fullWidth
                    indicatorColor="accent"
                    textColor="primary">
                    <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-phone"></i>} label="RECENTS" />
                    <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-favorite"></i>} label="FAVORITES" />
                    <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-account-add"></i>} label="NEARBY" />
                </Tabs>
            </RctCollapsibleCard>
        );
    }
}

export default IconWithLabel;
