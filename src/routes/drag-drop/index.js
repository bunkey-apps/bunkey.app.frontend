/**
 * Drag and Drop Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncReactDragulaComponent,
    AsyncReactDndComponent
} from '../../components/AsyncComponent/AsyncComponent';

const DragAndDrop = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/react-dragula`} />
            <Route path={`${match.url}/react-dragula`} component={AsyncReactDragulaComponent} />
            <Route path={`${match.url}/react-dnd`} component={AsyncReactDndComponent} />
        </Switch>
    </div>
);

export default DragAndDrop;
