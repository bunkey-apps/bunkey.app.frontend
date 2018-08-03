/**
 * Comments Component
 */
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

// app config
import AppConfig from '../../constants/AppConfig';

export default class Comments extends Component {

	state = {
		comments: null
	}

	componentWillMount() {
		this.getComments();
	}

	// get comments
	getComments() {
		axios.get(`${AppConfig.appUrl}/data/comments.js`)
			.then((response) => {
				this.setState({ comments: response.data });
			})
			.catch(error => {
				// error hanlding
			})
	}

	render() {
		const { comments } = this.state;
		return (
			<Scrollbars className="comment-scrollbar" autoHeight autoHeightMin={100} autoHeightMax={600} autoHide>
				<ul className="list-group">
					{comments && comments.map((comment) => (
						<li className="list-group-item" key={comment.id}>
							<div className="media">
								<div className="media-left mr-20">
									<img src={comment.userAvatar} alt="user profile" className="rounded-circle" width="50" height="50" />
								</div>
								<div className="media-body">
									<div className="d-flex justify-content-between mb-10">
										<span className="text-muted">{comment.userName}</span>
										<span className="fs-12 text-muted">{comment.date}</span>
									</div>
									<p className="text-muted">{comment.comment}</p>
									<div className="badge-action">
										<ul className="list-inline">
											<li className="list-inline-item">
												<span className="badge badge-info badge-pill">Pending</span>
											</li>
											<li className="list-inline-item hover-action">
												<span className="badge badge-success badge-pill">Approve</span>
											</li>
											<li className="list-inline-item hover-action">
												<span className="badge badge-danger badge-pill">Reject</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</Scrollbars>
		);
	}
}
