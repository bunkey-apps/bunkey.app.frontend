/**
 * Ecommerce Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncShoplistComponent,
    AsyncShopGridComponent,
    AsyncInvoiceComponent,
} from '../../components/AsyncComponent/AsyncComponent';

const Ecommerce = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/shop-list`} />
            <Route path={`${match.url}/shop-list`} component={AsyncShoplistComponent} />
            <Route path={`${match.url}/shop-grid`} component={AsyncShopGridComponent} />
            <Route path={`${match.url}/invoice`} component={AsyncInvoiceComponent} />
        </Switch>
    </div>
);

export default Ecommerce;
