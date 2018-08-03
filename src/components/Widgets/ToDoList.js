/**
 * Todo List Widget
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem } from 'material-ui/List';
import update from 'react-addons-update';
import classnames from 'classnames';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { Scrollbars } from 'react-custom-scrollbars';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// rct section loader
import RctSectionLoader from '../RctSectionLoader/RctSectionLoader';

// app config
import AppConfig from '../../constants/AppConfig';

export default class TodoListWidget extends Component {

    state = {
        toDoListData: null,
        sectionReload: false,
        addNewTodoDialog: false,
        newTodo: {
            todoTitle: '',
            time: null,
            date: ''
        },
        snackbar: false,
        snackbarMessage: ''
    }

    componentWillMount() {
        this.getTodo();
    }

    // get todo
    getTodo() {
        this.setState({ sectionReload: true });
        axios.get(`${AppConfig.appUrl}/data/todo.js`)
            .then((response) => {
                this.setState({ toDoListData: response.data, sectionReload: false });
            }).catch(error => {
                this.setState({ toDoListData: null, sectionReload: false });
            })
    }

    /**
     * On Delete Task
     */
    onDeleteTask(e, task) {
        e.stopPropagation();
        this.setState({ sectionReload: true })
        let todos = this.state.toDoListData;
        let index = todos.indexOf(task);
        todos.splice(index, 1);
        let self = this;
        setTimeout(() => {
            self.setState({ toDoListData: todos, sectionReload: false, snackbar: true, snackbarMessage: 'Todo Deleted Successfully' });
        }, 1500);
    }

    // on change task status
    handleChange(value, data) {
        let selectedTodoIndex = this.state.toDoListData.indexOf(data);
        let newState = update(this.state, {
            toDoListData: {
                [selectedTodoIndex]: {
                    completed: { $set: value }
                }
            }
        });
        this.setState({ sectionReload: true });
        let self = this;
        setTimeout(() => {
            self.setState({ toDoListData: newState.toDoListData, sectionReload: false, snackbar: true, snackbarMessage: 'Todo Updated' });
        }, 1500);
    }

    // open add new todo dialog
    opnAddNewTodoDialog() {
        this.setState({ addNewTodoDialog: true });
    }

    // handle close add new todo dailog
    handleClose = () => {
        this.setState({ addNewTodoDialog: false });
    }

    // add new todo
    addNewTodo = () => {
        if (this.state.newTodo.todoTitle !== '' && this.state.newTodo.date) {
            let todos = this.state.toDoListData;
            let newTodo = {
                title: this.state.newTodo.todoTitle,
                date: this.state.newTodo.date,
                completed: false
            }
            todos.push(newTodo);
            this.setState({ sectionReload: true, addNewTodoDialog: false });
            let self = this;
            setTimeout(() => {
                self.setState({
                    toDoListData: todos,
                    addNewTodoDialog: false,
                    sectionReload: false,
                    snackbar: true,
                    snackbarMessage: 'Todo Added Successfully!'
                });
            }, 1500);
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.sectionReload &&
                    <RctSectionLoader />
                }
                <Scrollbars className="comment-scrollbar" autoHeight autoHeightMin={100} autoHeightMax={400} autoHide>
                    <List className="p-0">
                        {this.state.toDoListData && this.state.toDoListData.map((data, key) => (
                            <ListItem button key={key} onClick={() => this.handleChange(!data.completed, data)}>
                                <div className={classnames('d-flex justify-content-between w-100', { 'strike': data.completed })}>
                                    <div className="align-items-start clearfix">
                                        <div className="float-left">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={data.completed}
                                                        onChange={(event) => this.handleChange(event.target.checked, data)}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div className="float-left">
                                            {data.date && <span className="d-block fs-14 text-muted">{data.date}</span>}
                                            <p className="text-muted mb-0">{data.title}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center hover-action">
                                        <Button className="btn-danger text-white" variant="fab" mini onClick={(e) => this.onDeleteTask(e, data)}><i className="zmdi zmdi-delete"></i></Button>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbars>
                <div className="d-flex p-3">
                    <Button variant="raised" className="btn-primary text-white" onClick={() => this.opnAddNewTodoDialog()}><IntlMessages id="widgets.addNew" /></Button>
                </div>
                <Dialog
                    open={this.state.addNewTodoDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <IntlMessages id="components.addNewTasks" />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add New Todo. Add Todo Title And Select Time For Todo.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            onChange={(e) => this.setState({ newTodo: { ...this.state.newTodo, todoTitle: e.target.value } })}
                            label="Todo Title"
                            type="text"
                            fullWidth
                            value={this.state.newTodo.todoTitle}
                        />
                        <TextField
                            id="date"
                            label="Schedule Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                            onChange={(e) => this.setState({ newTodo: { ...this.state.newTodo, date: e.target.value } })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button raised="true" onClick={this.handleClose} className="btn-danger text-white">
                            <span><IntlMessages id="button.cancel" /></span>
                        </Button>
                        <Button raised="true" onClick={this.addNewTodo} className="btn-primary text-white">
                            <span><IntlMessages id="button.add" /></span>
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbar}
                    onClose={() => this.setState({ snackbar: false })}
                    autoHideDuration={2000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarMessage}</span>}
                />
            </Fragment>
        )
    }
}
