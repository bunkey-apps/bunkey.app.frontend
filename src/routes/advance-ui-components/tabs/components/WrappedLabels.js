/**
 * Wrapped Labels
 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

function TabContainer({ children }) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

class WrappedLabels extends Component {

    state = {
        activeTab: 0
    }

    handleChange(e, value) {
        this.setState({ activeTab: value });
    }

    render() {
        const { activeTab } = this.state;
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.wrappedLabels" />}
            >
                
                <AppBar position="static" className="bg-primary">
                    <Tabs value={activeTab} onChange={(e, value) => this.handleChange(e, value)}>
                        <Tab value={0} label="New Arrivals in the Longest Text of Nonfiction" />
                        <Tab value={1} label="Item Two" />
                        <Tab value={2} label="Item Three" />
                    </Tabs>
                </AppBar>
                {activeTab === 0 && <TabContainer>Item One</TabContainer>}
                {activeTab === 1 && <TabContainer>Item Two</TabContainer>}
                {activeTab === 2 && <TabContainer>Item Three</TabContainer>}
            </RctCollapsibleCard>
        );
    }
}

export default WrappedLabels;
