/**
 * Editor Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncQuillEditorComponent,
    AsyncWysiwygEditorComponent
} from '../../components/AsyncComponent/AsyncComponent';

const Editor = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/wysiwyg-editor`} />
            <Route path={`${match.url}/wysiwyg-editor`} component={AsyncWysiwygEditorComponent} />
            <Route path={`${match.url}/quill-editor`} component={AsyncQuillEditorComponent} />
        </Switch>
    </div>
);

export default Editor;
