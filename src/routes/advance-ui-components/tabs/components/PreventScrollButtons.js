/**
 * Prevent Scroll Buttons
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

class PreventScrollButtons extends Component {

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
                heading={<IntlMessages id="widgets.preventScrolledButtons" />}
            >
                <AppBar position="static" className="bg-primary">
                    <Tabs value={activeIndex} onChange={(e, value) => this.handleChange(e, value)} scrollable scrollButtons="off">
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-phone"></i>} />
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-favorite"></i>} />
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-pin-account"></i>} />
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-pin-help"></i>} />
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-shopping-basket"></i>} />
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-thumb-down"></i>} />
                        <Tab icon={<i className="zmdi-hc-lg zmdi zmdi-thumb-up"></i>} />
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

export default PreventScrollButtons;
