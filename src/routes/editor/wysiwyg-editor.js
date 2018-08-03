/**
 * Wysiwyg Editor
 */
/* eslint-disable */
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// page title bar
import PageTitleBar from '../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../components/RctCollapsibleCard/RctCollapsibleCard';

class EditorComponent extends Component {
  render() {
    return (
      <div className="editor-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.wysiwygEditor" />} match={this.props.match} />
        <RctCollapsibleCard heading={<IntlMessages id="sidebar.wysiwygEditor" />}>
            <Editor wrapperClassName="rct-editor-wrapper" editorClassName="rct-wysiwyg-editor" toolbarClassName="toolbar-class" />
        </RctCollapsibleCard>
      </div>
    );
  }
}


export default EditorComponent;
