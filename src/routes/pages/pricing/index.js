/**
 * Pricing
 */
/* eslint-disable */
import React, { Component } from 'react';
import Switch from 'react-toggle-switch';
import { Card, Button, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// components
import Testimonials from './Tesimonials';
import Faqs from './Faqs';

export default class PricingPage extends Component {

  state = {
    monthlyPlan: true,
    businessPlan: 30,
    enterprisePlan: 59
  }

  // on plan change
  onPlanChange(isMonthly) {
    this.setState({ monthlyPlan: !isMonthly });
    if (!isMonthly) {
      this.setState({ businessPlan: 30, enterprisePlan: 59 });
    } else {
      this.setState({ businessPlan: 35, enterprisePlan: 70 });
    }
  }

  render() {
    return (
      <div className="pricing-wrapper">
        <PageTitleBar title={<IntlMessages id="widgets.pricing" />} match={this.props.match} />
        <div className="pricing-top mb-50">
          <div className="row">
            <div className="col-sm-12 col-md-9 col-lg-7 mx-auto text-center">
              <h2 className="mb-20">Choose the plan that works for you.</h2>
              <div>
                <span>Monthly</span>
                <Switch onClick={() => this.onPlanChange(this.state.monthlyPlan)} on={this.state.monthlyPlan} />
                <span>Yearly ( get 2 month extra)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="price-list">
          <div className="row row-eq-height">
            <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4">
              <div className="pricing-icon mb-40">
                <img src={require('../../../assets/img/pricing-icon.png')} alt="pricing icon" className="img-fluid" width="" height="" />
              </div>
              <h2 className="text-warning pricing-title"><IntlMessages id="widgets.basic" /></h2>
              <p>Secure file sharing and collaboration. Ideal <br /> for small teams.</p>
              <div className="mb-25">
                <h2 className="amount-title"><IntlMessages id="widgets.free" /></h2>
                <span className="text-muted small">For 1 user</span>
              </div>
              <ul className="price-detail list-unstyled">
                <li>100 GB secure storage</li>
                <li>2 GB file upload</li>
                <li>Minimum 3 users, max 10 users</li>
              </ul>
              <Button variant="raised" className="btn-warning text-white btn-block btn-lg" >
                <IntlMessages id="widgets.startToBasic" />
              </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4">
              <div className="pricing-icon mb-40">
                <img src={require('../../../assets/img/pricing-icon.png')} alt="pricing icon" className="img-fluid" width="" height="" />
              </div>
              <h2 className="text-secondary pricing-title"><IntlMessages id="widgets.pro" /></h2>
              <p>More power & personalization</p>
              <span className="text-muted mb-5 d-block small">Starting at just</span>
              <div className="mb-25">
                <h2 className="amount-title">${this.state.businessPlan}<sub>/mo</sub></h2>
                <span className="text-muted small">For 1 user</span>
              </div>
              <ul className="price-detail list-unstyled">
                <li>Unlimited storage</li>
                <li>5 GB file upload</li>
                <li>Minimum 3 users, no maximum</li>
              </ul>
              <Button variant="raised" className="btn-secondary text-white btn-block btn-lg">
                <IntlMessages id="widgets.upgradeToPro" />
              </Button>
            </RctCollapsibleCard>
            <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4">
              <div className="pricing-icon mb-40">
                <img src={require('../../../assets/img/pricing-icon.png')} alt="pricing icon" className="img-fluid" width="" height="" />
              </div>
              <h2 className="text-success pricing-title"><IntlMessages id="widgets.advanced" /></h2>
              <p>Advanced features for brands</p>
              <span className="text-muted mb-5 d-block small">Starting at just</span>
              <div className="mb-25">
                <h2 className="amount-title">${this.state.enterprisePlan}<sub>/mo</sub></h2>
                <span className="text-muted small">For 1 or more users</span>
              </div>
              <ul className="price-detail list-unstyled">
                <li>Unlimited storage</li>
                <li>15 GB file upload</li>
                <li>Minimum 3 users, no maximum</li>
              </ul>
              <Button variant="raised" className="btn-success text-white btn-block btn-lg" >
                <IntlMessages id="widgets.upgradeToAdvance" />
              </Button>
            </RctCollapsibleCard>
          </div>
          <div className="text-center py-40">
            <h2 className="mb-0"><IntlMessages id="widgets.comparePlans" /></h2>
          </div>
          <div className="fixed-pricing">
            <div className="row no-gutters row-eq-height">
              <div className="col-sm-12 col-md-4">
                <div className="pricing-box">
                  <div className="pricing-head">
                    <h2 className="text-warning pricing-title mb-0"><IntlMessages id="widgets.basic" /> (<IntlMessages id="widgets.free" />)</h2>
                  </div>
                  <div className="plan-info">
                    <span>100 responses / mo</span>
                  </div>
                  <div className="pricing-body">
                    <ul className="list-unstyled plan-info-listing">
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Granular access and controls</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Desktop sync</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Mobile access</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Version history</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>SSL and at-rest encryption</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Two-factor authentication</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Standard business support</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>User management</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>25,000 API calls per month</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                    </ul>
                    <Button variant="raised" className="btn-warning text-white btn-block btn-lg">
                      <IntlMessages id="widgets.startToBasic" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="pricing-box">
                  <div className="pricing-head">
                    <h2 className="text-secondary pricing-title mb-0"><IntlMessages id="widgets.pro" /></h2>
                  </div>
                  <div className="plan-info">
                    <span>Unlimited responses</span>
                  </div>
                  <div className="pricing-body">
                    <ul className="list-unstyled plan-info-listing">
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Includes all Starter features plus:</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Advanced user and security reporting</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Custom branding</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Mobile security controls</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Integrations with EMM providers</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Data Loss Prevention (DLP)</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Standard business support</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>50,000 API calls per month</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>25,000 API calls per month</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                    </ul>
                    <Button variant="raised" className="btn-secondary text-white btn-block btn-lg">
                      <IntlMessages id="widgets.upgradeToPro" />
                      .</Button>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="pricing-box">
                  <div className="pricing-head">
                    <h2 className="text-success pricing-title mb-0"><IntlMessages id="widgets.advanced" /></h2>
                  </div>
                  <div className="plan-info">
                    <span>Unlimited responses</span>
                  </div>
                  <div className="pricing-body">
                    <ul className="list-unstyled plan-info-listing">
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Includes all Business features plus:</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Unlimited external collaborators</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Full content visibility and management</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Unlimited integrations</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Workflow automations</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Document watermarking</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Device trust (advanced mobile requirements)</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Password policy enforcement</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                      <li className="d-flex justify-align-start"><i className="ti-check-box"></i>
                        <a data-tip>Metadata and custom templates</a>
                        <ReactTooltip place="right" effect="solid" className="rct-tooltip">
                          <span>It is a long established fact that a reader will be distracted by the
                          readable content of a page when looking at its layout.</span>
                        </ReactTooltip>
                      </li>
                    </ul>
                    <Button variant="raised" className="btn-success text-white btn-block btn-lg">
                      <IntlMessages id="widgets.upgradeToAdvance" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-wrapper mb-50">
          <div className="row">
            <Testimonials />
          </div>
        </div>
        <Faqs />
      </div>
    );
  }
}
