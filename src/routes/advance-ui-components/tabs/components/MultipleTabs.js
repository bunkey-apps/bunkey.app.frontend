/**
 * Multiple Tabs
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

class MultipleTabs extends Component {

    state = {
        activeIndex: 0
    }

    handleChange(e, value) {
        this.setState({ activeIndex: value });
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.multipleTabs" />}
            >
                <AppBar position="static" color="default">
                    <Tabs
                        value={activeIndex}
                        onChange={(e, value) => this.handleChange(e, value)}
                        indicatorColor="accent"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto">
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                    </Tabs>
                </AppBar>
                {activeIndex === 0 && <TabContainer>Item One</TabContainer>}
                {activeIndex === 1 && <TabContainer>Item Two</TabContainer>}
                {activeIndex === 2 && <TabContainer>Item Three</TabContainer>}
                {activeIndex === 3 && <TabContainer>Item Four</TabContainer>}
                {activeIndex === 4 && <TabContainer>Item Five</TabContainer>}
                {activeIndex === 5 && <TabContainer>Item Six</TabContainer>}
                {activeIndex === 6 && <TabContainer>Item Seven</TabContainer>}
            </RctCollapsibleCard>
        );
    }
}

export default MultipleTabs;
