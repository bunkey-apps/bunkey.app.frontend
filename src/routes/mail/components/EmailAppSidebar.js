/**
* Email App Sidebar
* Used To Filter Mail List
*/
import React, { Component } from 'react';
import List, { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

// actions
import { filterEmails } from '../../../actions';

class EmailAppSidebar extends Component {

  /**
   * Navigate To Folder Emails
   */
  navigateTo(key) {
    const { match, history } = this.props;
    history.push(`${match.url}/folder/${key}`);
  }

  /**
   * Filter Emails
   */
  filterEmails(label) {
    this.props.filterEmails(label);
  }

  render() {
    const { folders, selectedFolder, labels } = this.props;
    return (
      <Scrollbars autoHide style={{ height: "calc(100vh - 220px)" }}>
        <div className="sidebar-filters-wrap">
          <div className="filters">
            <List className="py-0">
              {folders.map((folder, key) => (
                <ListItem
                  button
                  key={key}
                  onClick={() => this.navigateTo(folder.handle)}
                  className={classnames({ 'item-active': selectedFolder === folder.id })}>
                  <i className={`mr-20 zmdi zmdi-${folder.icon}`} /><span className="filter-title">{folder.title}</span>
                </ListItem>
              ))}
            </List>
          </div>
          <h4 className="sidebar-title">Labels</h4>
          <div className="filters">
            <List className="list-unstyled">
              {labels.map((label, key) => (
                <ListItem button key={key} onClick={() => this.filterEmails(label)}>
                  <span className={`badge-${label.badgeClass} ladgend`}></span> <span className="filter-title">{label.name}</span>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Scrollbars>
    );
  }
}

// map state to props
const mapStateToProps = ({ emailApp }) => {
  return emailApp;
};

export default withRouter(connect(mapStateToProps, {
  filterEmails
})(EmailAppSidebar));
