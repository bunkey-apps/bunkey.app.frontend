/**
 * User Management Page
 */
/* eslint-disable */
import React, { Component } from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import { NotificationManager } from 'react-notifications';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';

// add new user form
import AddNewUserForm from './AddNewUserForm';

// update user form
import UpdateUserForm from './UpdateUserForm';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from '../../../components/RctSectionLoader/RctSectionLoader';

// app config
import AppConfig from '../../../constants/AppConfig';

export default class UserProfile extends Component {

  state = {
    all: false,
    users: null, // initial user data
    openConfirmationAlert: false, // confirmation to delete user
    selectedUser: null, // selected user to perform operations
    loading: false, // loading activity
    addNewUserModal: false, // add new user form modal
    addNewUserDetail: {
      id: '',
      name: '',
      avatar: '',
      type: '',
      emailAddress: '',
      status: 'Active',
      lastSeen: '',
      accountType: '',
      badgeClass: 'badge-success',
      dateCreated: 'Just Now',
      checked: false
    },
    openViewUserDialog: false, // view user dialog box
    editUser: null
  }

  componentWillMount() {
    axios.get(`${AppConfig.appUrl}/data/userManagement.js`)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        // error hanlding
      })
  }

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  }

  /**
   * On Delete
   */
  onDelete(data) {
    this.setState({ openConfirmationAlert: true, selectedUser: data });
  }

  /**
   * Delete User Permanently
   */
  deleteUserPermanently() {
    const { selectedUser } = this.state;
    let users = this.state.users;
    let indexOfDeleteUser = users.indexOf(selectedUser);
    users.splice(indexOfDeleteUser, 1);
    this.setState({ loading: true, openConfirmationAlert: false });
    let self = this;
    setTimeout(() => {
      self.setState({ loading: false, users, selectedUser: null });
      NotificationManager.success('User Deleted!');
    }, 2000);
  }

  /**
   * Open Add New User Modal
   */
  opnAddNewUserModal() {
    this.setState({ addNewUserModal: true });
  }

  /**
   * On Reload
   */
  onReload() {
    this.setState({ loading: true });
    let self = this;
    setTimeout(() => {
      self.setState({ loading: false });
    }, 2000);
  }

  /**
   * On Select User
   */
  onSelectUser(index) {
    let users = this.state.users;
    users[index].checked = !users[index].checked;
    this.setState({ users });
  }

  /**
   * On Change Add New User Details
   */
  onChangeAddNewUserDetails(key, value) {
    this.setState({
      addNewUserDetail: {
        ...this.state.addNewUserDetail,
        [key]: value
      }
    });
  }

  /**
   * Add New User
   */
  addNewUser() {
    const { name, emailAddress } = this.state.addNewUserDetail;
    if (name !== '' && emailAddress !== '') {
      let users = this.state.users;
      let newUser = {
        ...this.state.addNewUserDetail,
        id: new Date().getTime()
      }
      users.push(newUser);
      this.setState({ addNewUserModal: false, loading: true });
      let self = this;
      setTimeout(() => {
        self.setState({ loading: false, users });
        NotificationManager.success('User Created!');
      }, 2000);
    }
  }

  /**
   * View User Detail Hanlder
   */
  viewUserDetail(data) {
    this.setState({ openViewUserDialog: true, selectedUser: data });
  }

  /**
   * On Edit User
   */
  onEditUser(user) {
    this.setState({ addNewUserModal: true, editUser: user });
  }

  /**
   * On Add & Update User Modal Close
   */
  onAddUpdateUserModalClose() {
    this.setState({ addNewUserModal: false, editUser: null })
  }

  /**
   * On Update User Details
   */
  onUpdateUserDetails(key, value) {
    this.setState({
      editUser: {
        ...this.state.editUser,
        [key]: value
      }
    });
  }

  /**
   * Update User
   */
  updateUser() {
    const { editUser } = this.state;
    let indexOfUpdateUser = '';
    let users = this.state.users;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.id === editUser.id) {
        indexOfUpdateUser = i
      }
    }
    users[indexOfUpdateUser] = editUser;
    this.setState({ loading: true, editUser: null, addNewUserModal: false });
    let self = this;
    setTimeout(() => {
      self.setState({ users, loading: false });
      NotificationManager.success('User Updated!');
    }, 2000);
  }

  render() {
    const { users, loading, selectedUser, editUser } = this.state;
    return (
      <div className="user-management">
        <PageTitleBar title={<IntlMessages id="sidebar.userManagement" />} match={this.props.match} />
        <RctCollapsibleCard fullBlock>
          <div className="table-responsive">
            <div className="d-flex justify-content-between py-20 px-10 border-bottom">
              <div>
                <a href="javascript:void(0)" onClick={() => this.onReload()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                <a href="javascript:void(0)" className="btn-outline-default mr-10">More</a>
              </div>
              <div>
                <a href="javascript:void(0)" className="btn-sm btn-outline-default mr-10">Export to Excel</a>
                <a href="javascript:void(0)" onClick={() => this.opnAddNewUserModal()} className="caret btn-primary btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
              </div>
            </div>
            <table className="table table-middle table-hover mb-0">
              <thead>
                <tr>
                  <th className="w-5">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.jason}
                          onChange={this.handleChange('all')}
                          value="all"
                        />
                      }
                      label="All"
                    />
                  </th>
                  <th>User</th>
                  <th>Email Address</th>
                  <th>Status</th>
                  <th>Plans Type</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user, key) => (
                  <tr key={key}>
                    <td>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={user.checked}
                            onChange={() => this.onSelectUser(key)}
                          />
                        }
                      />
                    </td>
                    <td>
                      <div className="media">
                        {user.avatar !== '' ?
                          <img src={user.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                          : <Avatar className="mr-15">{user.name.charAt(0)}</Avatar>
                        }
                        <div className="media-body">
                          <h5 className="mb-5 fw-bold">{user.name}</h5>
                          <span className="badge badge-warning">{user.type}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.emailAddress}</td>
                    <td className="d-flex justify-content-start">
                      <span className={`badge badge-xs ${user.badgeClass} mr-10 mt-10`}>&nbsp;</span>
                      <div className="status">
                        <span className="d-block">{user.status}</span>
                        <span className="small">{user.lastSeen}</span>
                      </div>
                    </td>
                    <td><span className={`badge ${user.badgeClass} badge-pill`}>{user.accountType}</span></td>
                    <td>{user.dateCreated}</td>
                    <td className="list-action">
                      <a href="javascript:void(0)" onClick={() => this.viewUserDetail(user)}><i className="ti-eye"></i></a>
                      <a href="javascript:void(0)" onClick={() => this.onEditUser(user)}><i className="ti-pencil"></i></a>
                      <a href="javascript:void(0)" onClick={() => this.onDelete(user)}><i className="ti-close"></i></a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-top">
                <tr>
                  <td colSpan="100%">
                    <Pagination className="mb-0 py-10 px-10">
                      <PaginationItem>
                        <PaginationLink previous href="#" />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="javascript:void(0)">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="javascript:void(0)">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="javascript:void(0)">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink next href="javascript:void(0)" />
                      </PaginationItem>
                    </Pagination>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {loading &&
            <RctSectionLoader />
          }
        </RctCollapsibleCard>
        <Dialog
          open={this.state.openConfirmationAlert}
          onClose={() => this.setState({ openConfirmationAlert: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure Want To Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will delete user permanently.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={() => this.setState({ openConfirmationAlert: false })} className="text-white btn-danger">
              Disagree
            </Button>
            <Button variant="raised" onClick={() => this.deleteUserPermanently()} className="text-white btn-primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Modal isOpen={this.state.addNewUserModal} toggle={() => this.onAddUpdateUserModalClose()}>
          <ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
            {editUser === null ?
              'Add New User' : 'Update User'
            }
          </ModalHeader>
          <ModalBody>
            {editUser === null ?
              <AddNewUserForm
                addNewUserDetails={this.state.addNewUserDetail}
                onChangeAddNewUserDetails={this.onChangeAddNewUserDetails.bind(this)}
              />
              : <UpdateUserForm user={editUser} onUpdateUserDetail={this.onUpdateUserDetails.bind(this)} />
            }
          </ModalBody>
          <ModalFooter>
            {editUser === null ?
              <Button variant="raised" className="text-white btn-success" onClick={() => this.addNewUser()}>Add</Button>
              : <Button variant="raised" className="text-white btn-primary" onClick={() => this.updateUser()}>Update</Button>
            }
            {' '}
            <Button variant="raised" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Dialog
          onClose={() => this.setState({ openViewUserDialog: false })}
          open={this.state.openViewUserDialog}
        >
          <DialogContent>
            {selectedUser !== null &&
              <div>
                <div className="clearfix d-flex">
                  <div className="media pull-left">
                    <img src={selectedUser.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                    <div className="media-body">
                      <p>Name: <span className="fw-bold">{selectedUser.name}</span></p>
                      <p>Email: <span className="fw-bold">{selectedUser.emailAddress}</span></p>
                      <p>Type: <span className="badge badge-warning">{selectedUser.type}</span></p>
                      <p>Account Type: <span className={`badge ${selectedUser.badgeClass} badge-pill`}>{selectedUser.accountType}</span></p>
                      <p>Status: {selectedUser.status}</p>
                      <p>Last Seen: {selectedUser.lastSeen}</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
