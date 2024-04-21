import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { submitReview } from '../actions/reviewActions'; // Make sure to implement this action

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            review: {
                rating: '',
                comment: '',
                movieId: this.props.movieId // Assuming movieId is passed as a prop to this component
            }
        };
    }

    updateReviewDetails = (event) => {
        let reviewDetails = {...this.state.review};
        reviewDetails[event.target.id] = event.target.value;
        this.setState({
            review: reviewDetails
        });
    }

    submitReview = () => {
        const { dispatch } = this.props;
        dispatch(submitReview(this.state.review));
    }

    render() {
        return (
            <Form className="form-horizontal">
                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control 
                        as="select" 
                        onChange={this.updateReviewDetails} 
                        value={this.state.review.rating}
                    >
                        <option value="">Select a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        onChange={this.updateReviewDetails} 
                        value={this.state.review.comment} 
                        placeholder="Enter your review"
                    />
                </Form.Group>
                <Button onClick={this.submitReview}>Submit Review</Button>
            </Form>
        );
    }
}

export default connect()(Review);