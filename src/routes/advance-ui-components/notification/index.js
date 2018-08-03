/**
 * Notification Advance UI Components
 */
import React from 'react';
import 'react-notifications/lib/notifications.css';
import Button from 'material-ui/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

export default class Notification extends React.Component {
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
        default:
          NotificationManager.success('Success message', 'Title here');
          break;
      }
    };
  };

  render() {
    return (
      <div className="notification-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.notification" />} match={this.props.match} />
        <RctCollapsibleCard
          heading="Notifications"
        >
          <Button variant="raised" className='text-white btn btn-info mr-10 mb-10'
            onClick={this.createNotification('info')}>Info
          </Button>
          <Button variant="raised" className='text-white btn btn-success mr-10 mb-10'
            onClick={this.createNotification('success')}>Success
          </Button>
          <Button variant="raised" className='text-white btn btn-warning mr-10 mb-10'
            onClick={this.createNotification('warning')}>Warning
          </Button>
          <Button variant="raised" className='text-white btn btn-danger mr-10 mb-10'
            onClick={this.createNotification('error')}>Error
          </Button>
        </RctCollapsibleCard>
        <NotificationContainer />
      </div>
    );
  }
}
