/**
 * Feedbacks Listings
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

// actions
import {
    onFeedbackFavorite,
    onDeleteFeedback,
    viewFeedbackDetails,
    showFeedbackLoadingIndicator,
    replyFeedback,
    sendReply
} from '../../../../actions';

// components
import FeedbacksListItem from './FeedbacksListItem';

class FeedbacksListing extends Component {

    state = {
        deleteAlert: false,
        deleteFeedback: null
    }

    /**
     * Handle Click Open
     */
    handleClickOpen = () => {
        this.setState({ deleteAlert: true });
    };

    /**
     * Hanldle Close
     */
    handleClose = () => {
        this.setState({ deleteAlert: false });
    };


    /**
     * On Feedback Favorite
     */
    onFeedbackFavorite(feedback) {
        this.props.onFeedbackFavorite(feedback);
    }

    /**
     * On Delete Feedback
     */
    onDeleteFeedback(feedback) {
        this.setState({ deleteAlert: true, deleteFeedback: feedback });
    }

    /**
     * Delete Feedback After Alert
     */
    deleteFeedback() {
        this.setState({ deleteAlert: false });
        this.props.showFeedbackLoadingIndicator();
        let self = this;
        setTimeout(() => {
            self.props.onDeleteFeedback(this.state.deleteFeedback);
        }, 1500);
    }

    /**
     * View Feedback Details
     */
    viewFeedbackDetails(feedback) {
        this.props.showFeedbackLoadingIndicator();
        let self = this;
        setTimeout(() => {
            self.props.viewFeedbackDetails(feedback);
        }, 1500);
    }

    /**
     * Reply Feedback
     */
    replyFeedback(feedback) {
        this.props.replyFeedback(feedback);
    }

    /**
     * Send Reply
     */
    onReplySend(feedback) {
        this.props.showFeedbackLoadingIndicator();
        let self = this;
        setTimeout(() => {
            self.props.sendReply(feedback);
        }, 1500);
    }

    render() {
        const { feedbacks } = this.props;
        return (
            <div>
                <ul className="list-unstyled mb-0">
                    {feedbacks && feedbacks.map((feedback, key) => (
                        <FeedbacksListItem
                            data={feedback}
                            key={key}
                            onFeedbackFavorite={() => this.onFeedbackFavorite(feedback)}
                            onDeleteFeedback={() => this.onDeleteFeedback(feedback)}
                            viewFeedbackDetails={() => this.viewFeedbackDetails(feedback)}
                            onReply={() => this.replyFeedback(feedback)}
                            onReplySend={() => this.onReplySend(feedback)}
                        />
                    ))}
                </ul>
                <Dialog
                    open={this.state.deleteAlert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure want to delete?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will delete permanently your feedback from feedback list.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} className="btn-danger text-white">
                            Cancel
                        </Button>
                        <Button onClick={() => this.deleteFeedback()} className="btn-primary text-white" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ feedback }) => {
    return feedback;
}

export default connect(mapStateToProps, {
    onFeedbackFavorite,
    onDeleteFeedback,
    viewFeedbackDetails,
    showFeedbackLoadingIndicator,
    replyFeedback,
    sendReply
})(FeedbacksListing);
