/**
 * Add New Task Component
 * Used To Add New Task In The Todo List
 */
/* eslint-disable */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// redux actions
import { addNewTaskAction } from '../../../actions';

// intl message
import IntlMessages from '../../../util/IntlMessages';

class AddNewTask extends Component {

    state = {
        addNewTaskModal: false, // modal
        labels: null, // labels
        taskName: '', // task name
        assignTo: null // assign to
    }

    /**
     * Toggle Add New Task Modal
     */
    toggleAddNewTaskModal = () => {
        this.setState({
            addNewTaskModal: !this.state.addNewTaskModal
        });
    }

    /**
     * Handle Add New Task
     */
    addNewTask = () => {
        const { taskName, assignTo, labels } = this.state;
        let newTaskData;
        let taskAssignTo;
        if (taskName !== '' && assignTo !== null && labels !== null) {
            for (const assign of this.props.users) {
                if (assignTo == assign.id) {
                    taskAssignTo = assign
                }
            }
            let randomId = Math.floor((Math.random() * 1000) + 1);
            newTaskData = {
                id: randomId,
                task_name: taskName,
                assignTo: taskAssignTo,
                labels
            }
            this.setState({ addNewTaskModal: false });
            this.props.addNewTaskAction(newTaskData);
        }
    }

    /**
     * On Change Assign To
     */
    onChangeAssignTo = (e) => {
        this.setState({ assignTo: e.target.value });
    }

    /**
     * On Change Labels
     */
    onChangeLabels = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(Number(options[i].value));
            }
        }
        this.setState({ labels: value });
    }

    render() {
        const { addNewTaskModal } = this.state;
        return (
            <div className="add-task p-20">
                <Button variant="raised" className="btn-success text-white btn-block btn-lg" onClick={this.toggleAddNewTaskModal}>
                    <i className="zmdi zmdi-border-color mr-20"></i> <IntlMessages id="components.addNewTasks" />
                </Button>
                <Modal isOpen={addNewTaskModal} toggle={this.toggleAddNewTaskModal}>
                    <ModalHeader toggle={this.toggleAddNewTaskModal}><IntlMessages id="components.addNewTasks" /></ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="task-name">Task Name</Label>
                                <Input type="text" name="taskName" id="task-name" placeholder="Enter Task Name" onChange={(e) => this.setState({ taskName: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="labels">Task Labels</Label>
                                <Input type="select" name="labels" id="task-labels" multiple onChange={this.onChangeLabels}>
                                    {this.props.labels.map((label, key) => (
                                        <option key={key} value={label.value}>{label.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="labels">Assign To</Label>
                                <Input type="select" name="labels" id="task-labels" onChange={this.onChangeAssignTo} >
                                    {this.props.users.map((user, key) => (
                                        <option key={key} value={user.id}>{user.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="raised" className="btn-primary text-white" onClick={this.addNewTask}><IntlMessages id="button.add" /></Button>{' '}
                        <Button variant="raised" className="btn-danger text-white" onClick={this.toggleAddNewTaskModal}><IntlMessages id="button.cancel" /></Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ todoApp }) => {
    const { users, labels } = todoApp;
    return { users, labels };
};

export default connect(mapStateToProps, {
    addNewTaskAction
})(AddNewTask);
