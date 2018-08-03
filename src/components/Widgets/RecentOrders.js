/**
 * Recent Orders
 */
import React, { Component } from 'react';
import axios from 'axios';

// app config
import AppConfig from '../../constants/AppConfig';

class RecentOrders extends Component {

  state = {
    recentOrders: null
  }

  componentWillMount() {
    this.getRecentOrders();
  }

  // recent orders
  getRecentOrders() {
    axios.get(`${AppConfig.appUrl}/data/recentOrders.js`)
      .then((response) => {
        this.setState({ recentOrders: response.data });
      })
      .catch(error => {
        // error hanlding
      })
  }

  render() {
    const { recentOrders } = this.state;
    return (
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Invoice</th>
              <th>Customer Name</th>
              <th>Profitment</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders && recentOrders.map((order, key) => (
              <tr key={key}>
                <td>{order.id}</td>
                <td>{order.invoice}</td>
                <td>
                  {order.customerName}
                  <p className="text-muted mb-0">{order.customerEmail}</p>
                </td>
                <td>${order.amount}</td>
                <td>
                  <span className={`badge ${order.labelClass} badge-pill`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RecentOrders;
