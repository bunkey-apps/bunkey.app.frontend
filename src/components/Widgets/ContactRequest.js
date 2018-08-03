/**
 * Contact Request Widget
 */
/* eslint-disable */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import SweetAlert from 'react-bootstrap-sweetalert'

class ContactRequestWidget extends Component {

    state = {
        successAlert: false
    }

    onAccept() {
        this.setState({ successAlert: true });
    }

    onReject() {
        this.setState({ successAlert: false });
    }

    onConfirm() {
        this.setState({ successAlert: false });
    }

    render() {
        return (
            <div className="lazy-up">
                <a href="javascript:void(0);" className="square-40 bg-danger card-top-action"><i className="ti-id-badge"></i></a>
                <div className="card pt-30">
                    <div className="media">
                        <div className="media-left mr-25">
                            <img src={require('../../assets/img/user-8.jpg')} className="img-fluid rounded-circle" alt="user profile" width="90" height="90" />
                        </div>
                        <div className="media-body">
                            <span className="mb-5 text-pink fs-14 d-block">Contact Request</span>
                            <h4 className="mb-5">Andre Hicks</h4>
                            <span className="text-muted fs-14 mb-15 d-block">Sr. Develoepr @Oracle</span>
                        </div>
                    </div>
                    <div className="card-foot d-flex align-self-end">
                      <Button variant="raised" size="small" onClick={() => this.onAccept()} className="btn-success mr-5 mb-10 text-white">Accept</Button>
                      <Button variant="raised" size="small" onClick={() => this.onReject()} className="btn-secondary mb-10 text-white">Reject</Button>
                    </div>
                </div>
                <SweetAlert success show={this.state.successAlert} title="Contact Request Accecpted" onConfirm={() => this.onConfirm('success')}>
                    You clicked the button!
                </SweetAlert>
            </div>
        );
    }
}

export default ContactRequestWidget;
