/**
 * Inbox Emails
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';

// components
import EmailListing from '../components/EmailListing';
import EmailDetail from '../components/EmailDetail';

// redux actions
import { getInbox } from '../../../actions';

class Inbox extends Component {

    componentWillMount() {
        this.props.getInbox();
    }

    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={match.url} component={EmailListing} />
                <Route path={`${match.url}/:id`} component={EmailDetail} />
            </Switch>
        );
    }
}

export default withRouter(connect(null, {
    getInbox
})(Inbox));
