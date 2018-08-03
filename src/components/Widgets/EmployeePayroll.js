/**
 * Employ Payroll
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import update from 'react-addons-update';
import axios from 'axios';

// rct section loader
import RctSectionLoader from '../RctSectionLoader/RctSectionLoader';

// app config
import AppConfig from '../../constants/AppConfig';

class EmployPayroll extends Component {

    state = {
        employPayrollReload: false,
        employeePayroll: null
    }

    componentWillMount() {
        this.getEmployeePayrolls();
    }

    // get employee payrols
    getEmployeePayrolls() {
        axios.get(`${AppConfig.appUrl}/data/employeePayrols.js`)
            .then((response) => {
                this.setState({ employeePayroll: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // delete employee payroll
    deleteEmployePayroll(employee) {
        this.setState({ employPayrollReload: true });
        let index = this.state.employeePayroll.indexOf(employee);
        setTimeout(() => (
            this.setState(prevState => ({
                employeePayroll: update(prevState.employeePayroll, { $splice: [[index, 1]] }),
                employPayrollReload: false
            }))
        ), 1500);
    }

    // on check box click
    onCheckBoxClick(employee) {
        let index = this.state.employeePayroll.indexOf(employee);
        this.setState({
            employeePayroll: update(this.state.employeePayroll, {
                [index]: { status: { $set: 1 } }
            })
        })
    }

    render() {
        const { employeePayroll, employPayrollReload } = this.state;
        return (
            <Fragment>
                {employPayrollReload &&
                    <RctSectionLoader />
                }
                <div className="table-responsive">
                    <table className="table table-hover table-middle mb-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeePayroll && employeePayroll.map((employee, key) => (
                                <tr key={key}>
                                    <td>
                                        <div className="media">
                                            <div className="media-left media-middle mr-15">
                                                <img src={employee.employeeAvatar} alt="user profile" className="media-object rounded-circle" width="35" height="35" />
                                            </div>
                                            <div className="media-body pt-10">
                                                <h6 className="m-0 fw-bold text-dark">{employee.employeeName}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{employee.designation}</td>
                                    <td>${employee.salary}</td>
                                    <td>
                                        {employee.status === 1 ?
                                            <span className="badge badge-primary">Done</span>
                                            : <span className="badge badge-warning">Pending</span>
                                        }
                                    </td>
                                    <td className="table-action">
                                        {employee.status === 0 && <a href="javascript:void(0)" onClick={() => this.onCheckBoxClick(employee)}><i className="ti-check"></i></a>}
                                        <a href="javascript:void(0)" onClick={() => this.deleteEmployePayroll(employee)}><i className="ti-close"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        );
    }
}

export default EmployPayroll;
