/**
 * Profile Page
 */
import React, { Component } from 'react';
import { FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { NotificationManager } from 'react-notifications';

export default class Profile extends Component {

  /**
   * On Update Profile
   */
  onUpdateProfile() {
    NotificationManager.success('Profile Updated Successfully!');
  }

  render() {
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">Personal Details</h2>
        <Form>
          <FormGroup row>
            <Label for="firstName" sm={3}>First Name</Label>
            <Col sm={9}>
              <Input type="text" name="firstName" id="firstName" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lastName" sm={3}>Last Name</Label>
            <Col sm={9}>
              <Input type="text" name="lastName" id="lastName" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="occupation" sm={3}>Occupation</Label>
            <Col sm={9}>
              <Input type="text" name="occupation" id="occupation" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="company" sm={3}>Company Name</Label>
            <Col sm={9}>
              <Input type="text" name="company" id="company" className="input-lg mb-20" />
              <div className="help-text d-flex p-10">
                <i className="ti-info-alt mr-15 pt-5"></i>
                <span>If you want your invoices addressed to a company. Leave blank to use your full name.</span>
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="telephone" sm={3}>Phone No.</Label>
            <Col sm={9}>
              <Input type="tel" name="telephone" id="telephone" className="input-lg" />
            </Col>
          </FormGroup>
        </Form>
        <hr />
        <h2 className="heading">Address</h2>
        <Form>
          <FormGroup row>
            <Label for="address" sm={3}>Address</Label>
            <Col sm={9}>
              <Input type="text" name="address" id="address" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={3}>City</Label>
            <Col sm={9}>
              <Input type="text" name="city" id="city" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="state" sm={3}>State</Label>
            <Col sm={9}>
              <Input type="text" name="state" id="state" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="zip" sm={3}>Zip Code</Label>
            <Col sm={9}>
              <Input type="text" name="zip" id="zip" className="input-lg" />
            </Col>
          </FormGroup>
        </Form>
        <hr />
        <h2 className="heading">Social Connection</h2>
        <div>
          <InputGroup className="mb-20">
            <InputGroupAddon addonType="prepend">
              <IconButton aria-label="facebook">
                <i className="zmdi zmdi-facebook"></i>
              </IconButton>
            </InputGroupAddon>
            <Input defaultValue="https://www.facebook.com" />
          </InputGroup>
          <InputGroup className="mb-20">
            <InputGroupAddon addonType="prepend">
              <IconButton aria-label="facebook">
                <i className="zmdi zmdi-twitter"></i>
              </IconButton>
            </InputGroupAddon>
            <Input defaultValue="https://www.twitter.com" />
          </InputGroup>
          <InputGroup className="mb-20">
            <InputGroupAddon addonType="prepend">
              <IconButton aria-label="facebook">
                <i className="zmdi zmdi-linkedin"></i>
              </IconButton>
            </InputGroupAddon>
            <Input defaultValue="https://www.linkedin.com" />
          </InputGroup>
        </div>
        <hr />
        <Button variant="raised" className="btn-primary text-white" onClick={() => this.onUpdateProfile()}>Update Profile</Button>
      </div>
    );
  }
}
