/**
 * Charts Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncRechartsComponent,
    AsyncReactChartsjs2Component
} from '../../components/AsyncComponent/AsyncComponent';

const ChartsComponent = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/re-charts`} />
            <Route path={`${match.url}/re-charts`} component={AsyncRechartsComponent} />
            <Route path={`${match.url}/react-chartjs2`} component={AsyncReactChartsjs2Component} />
        </Switch>
    </div>
);

export default ChartsComponent;
