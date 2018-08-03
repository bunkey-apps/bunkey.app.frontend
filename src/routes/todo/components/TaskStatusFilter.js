/**
 * Task Status Filter
 * Used To Filter Todo List
 */
import React, { Component } from 'react';
import List, { ListItem, ListSubheader } from 'material-ui/List';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// redux action
import {
    getAllTodoAction,
    getCompletedTodosAction,
    getDeletedTodosAction,
    getStarredTodosAction,
    activateFilterAction
} from '../../../actions';

class TaskStatusFilter extends Component {

    /**
     * Function to filter the todo list with labels
     */
    onFilterTodo(activeIndex) {
        console.log(activeIndex);
        this.props.activateFilterAction(activeIndex);
    }

    /**
     * Get Label Classes
     */
    getLabelClasses(value) {
        let labelClasses = '';
        switch (value) {
            case 1:
                labelClasses = 'ladgend bg-success';
                return labelClasses;
            case 2:
                labelClasses = 'ladgend bg-primary';
                return labelClasses;
            case 3:
                labelClasses = 'ladgend bg-info';
                return labelClasses;
            case 4:
                labelClasses = 'ladgend bg-danger';
                return labelClasses;
            default:
                return labelClasses;
        }
    }

    render() {
        const { labels } = this.props;
        return (
            <Scrollbars autoHide style={{ height: "calc(100vh - 220px)" }}>
                <div className="filters">
                    <List>
                        <ListItem button onClick={() => this.props.getAllTodoAction()}><span className="filter-title">All</span></ListItem>
                    </List>
                </div>
                <div className="filters">
                    <List subheader={<ListSubheader disableSticky>Filters</ListSubheader>}>
                        <ListItem button onClick={() => this.props.getCompletedTodosAction()}><i className="ti-check-box mr-2"></i> <span className="filter-title">Done</span></ListItem>
                        <ListItem button onClick={() => this.props.getDeletedTodosAction()}><i className="ti-trash mr-2"></i> <span className="filter-title">Deleted</span></ListItem>
                        <ListItem button onClick={() => this.props.getStarredTodosAction()}><i className="ti-star mr-2"></i> <span className="filter-title">Starred</span></ListItem>
                    </List>
                </div>
                <div className="filters">
                    <List className="list-unstyled" subheader={<ListSubheader disableSticky>Labels</ListSubheader>}>
                        {labels.map((label, key) => (
                            <ListItem button onClick={() => this.onFilterTodo(label.value)} key={key}>
                                <span className={this.getLabelClasses(label.value)}></span> <span className="filter-title">{label.name}</span>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Scrollbars>
        );
    }
}

// map state to props
const mapStateToProps = ({ todoApp }) => {
    const { labels } = todoApp;
    return { labels };
};

export default connect(mapStateToProps, {
    getAllTodoAction,
    getCompletedTodosAction,
    getDeletedTodosAction,
    getStarredTodosAction,
    activateFilterAction
})(TaskStatusFilter);
