/**
 * React Dragula
 */
import React, { Component } from 'react';
import Dragula from 'react-dragula';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// app config
import AppConfig from '../../../constants/AppConfig';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

export default class ReactDragulaComponent extends Component {

  state = {
    listData: null
  }

  componentWillMount() {
    this.getListData();
  }

  /**
   * Ger list data
   */
  getListData() {
    axios.get(`${AppConfig.appUrl}/data/reactDragulaList.js`)
      .then((response) => {
        this.setState({ listData: response.data });
      })
      .catch(error => {
        // error handling
      })
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  }

  render() {
    const { listData } = this.state;
    return (
      <div className="dragula-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.reactDragula" />} match={this.props.match} />
        <RctCollapsibleCard heading="Dragula" fullBlock>
          <div className="table-responsive">
            <table className="table table-dragula table-lg">
              <tbody ref={this.dragulaDecorator}>
                {listData && listData.map((item, key) => (
                  <tr key={key}>
                    <td className="w-5"><i className="ti-menu"></i></td>
                    <td>
                      <div className="media">
                        <div className="media-left mr-20">
                          <Avatar className={`${item.class} rounded-circle`}>{item.userName.charAt(0)}</Avatar>
                        </div>
                        <div className="media-body pt-10">
                          <h5 className="fw-bold">{item.userName}</h5>
                        </div>
                      </div>
                    </td>
                    <td className="w-5"><i className="ti-star text-warning"></i></td>
                    <td>{item.content}</td>
                    <td>{item.emailId}</td>
                    <td>{item.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RctCollapsibleCard>
      </div>
    );
  }
}
