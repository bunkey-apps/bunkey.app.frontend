/**
 * Recent Activities
 */
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

// app config
import AppConfig from '../../constants/AppConfig';

class RecentActivity extends Component {

  state = {
    activities: null
  }

  componentWillMount() {
    axios.get(`${AppConfig.appUrl}/data/recentActivities.js`)
      .then((response) => {
        this.setState({ activities: response.data });
      })
      .catch(error => {
        // error handling
      })
  }

  render() {
    const { activities } = this.state;
    return (
      <Scrollbars className="comment-scrollbar" autoHeight autoHeightMin={100} autoHeightMax={380} autoHide>
        <div className="timeline-wrapper">
          <ul className="list-unstyled">
            {activities && activities.map((activity, key) => (
              <li className="d-flex justify-content-start" key={key}>
                <span className={`timeline-ring border-${activity.status}`}></span>
                <div className="timeline-content">
                  <span className="text-muted fs-12 d-block">{activity.date}</span>
                  <p className="mb-0" dangerouslySetInnerHTML={{ __html: activity.activity }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Scrollbars>
    );
  }
}

export default RecentActivity;
