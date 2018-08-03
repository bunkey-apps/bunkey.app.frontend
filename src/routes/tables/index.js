/**
 * Tables Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncBasicTableComponent,
    AsyncDataTableComponent,
    AsyncReactTableComponent,
    AsyncResponsiveTableComponent
} from '../../components/AsyncComponent/AsyncComponent';

const Pages = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/basic`} />
            <Route path={`${match.url}/basic`} component={AsyncBasicTableComponent} />
            <Route path={`${match.url}/data-table`} component={AsyncDataTableComponent} />
            <Route path={`${match.url}/react-table`} component={AsyncReactTableComponent} />
            <Route path={`${match.url}/responsive`} component={AsyncResponsiveTableComponent} />
        </Switch>
    </div>
);

export default Pages;
