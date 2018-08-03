/**
 * Centered Tab
 */
import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

class CenteredTab extends Component {

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
                heading={<IntlMessages id="widgets.centeredLabels" />}
            >
                <Tabs
                    value={activeIndex}
                    onChange={(e, value) => this.handleChange(value)}
                    indicatorColor="accent"
                    textColor="primary"
                    centered>
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </RctCollapsibleCard>
        );
    }
}

export default CenteredTab;
