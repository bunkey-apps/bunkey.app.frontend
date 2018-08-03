/**
 * Notifications Widget
 */
import React, { Fragment, Component } from 'react';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { Scrollbars } from 'react-custom-scrollbars';
import Typography from 'material-ui/Typography';
import axios from 'axios';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class Notifications extends Component {

  state = {
    value: 0,
    messages: null,
    notificationTypes: null,
    notifications: null
  };

  componentWillMount() {
    this.getMessages();
    this.getNotificationTypes();
    this.getNotifications();
  }

  // get messages
  getMessages() {
    axios.get(`${AppConfig.appUrl}/data/messages.js`)
      .then((response) => {
        this.setState({ messages: response.data });
      })
      .catch(error => {
        console.log(error);
      })
  }

  // get notification types
  getNotificationTypes() {
    axios.get(`${AppConfig.appUrl}/data/notificationTypes.js`)
      .then((response) => {
        this.setState({ notificationTypes: response.data });
      })
      .catch(error => {
        console.log(error);
      })
  }

  // get notifications
  getNotifications() {
    axios.get(`${AppConfig.appUrl}/data/notifications.js`)
      .then((response) => {
        this.setState({ notifications: response.data });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  /**
   * Function to return notification name
   */
  getNotificationName(notificationId) {
    const { notificationTypes } = this.state;
    if (notificationTypes) {
      for (const notificationType of notificationTypes) {
        if (notificationId === notificationType.id) {
          return (
            <span className={`text-${notificationType.class} mr-5`}>
              <i className={`zmdi zmdi-${notificationType.icon}`}></i> {notificationType.Name}
            </span>
          );
        }
      }
    }
  }

  render() {
    const { theme } = this.props;
    const { messages, notifications } = this.state;
    return (
      <Fragment>
        <AppBar position="static" className="bg-dark">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            fullWidth>
            <Tab label={<IntlMessages id="widgets.recentNotifications" />} />
            <Tab label={<IntlMessages id="widgets.messages" />} />
          </Tabs>
        </AppBar>
        <Scrollbars className="comment-scrollbar" autoHeight autoHeightMin={100} autoHeightMax={410} autoHide>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}>
            <div className="card mb-0 notification-box">
              <TabContainer dir={theme.direction}>
                <ul className="list-inline mb-0">
                  {notifications && notifications.map((notification, key) => (
                    <li className="d-flex justify-content-between" key={key}>
                      <div className="align-items-start">
                        <p className="mb-5 message-head">
                          {this.getNotificationName(notification.notificationId)}
                          {notification.date}
                        </p>
                        <h5 className="mb-5">{notification.userName}</h5>
                        <p className="mb-0 text-muted">{notification.notification}</p>
                      </div>
                      <div className="align-items-end notify-user">
                        <img src={notification.userAvatar} alt="notify user" className="rounded-circle" width="50" height="50" />
                      </div>
                    </li>
                  ))}
                </ul>
              </TabContainer>
            </div>
            <div className="card mb-0 notification-box">
              <TabContainer dir={theme.direction}>
                <ul className="list-inline mb-0">
                  {messages && messages.map((message, key) => (
                    <li className="d-flex justify-content-between" key={key}>
                      <div className="align-items-start">
                        <p className="mb-5 message-head">
                          <span className="text-primary mr-5">
                            <i className="zmdi zmdi-comment-alt-text"></i> Message</span> {message.date}
                        </p>
                        <h5 className="mb-5">{message.from.userName}</h5>
                        <p className="mb-0 text-muted">{message.message}</p>
                      </div>
                      <div className="align-items-end notify-user">
                        <img src={message.from.userAvatar} alt="notify user" className="rounded-circle" width="50" height="50" />
                        <span className="badge badge-primary"><i className="zmdi zmdi-mail-reply"></i></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabContainer>
            </div>
          </SwipeableViews>
        </Scrollbars>
      </Fragment>
    );
  }
}

export default withStyles(null, { withTheme: true })(Notifications);
