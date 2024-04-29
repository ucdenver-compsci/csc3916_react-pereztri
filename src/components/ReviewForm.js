import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../actions/movieActions';
import { Form, Button } from 'react-bootstrap';

function ReviewForm({ movieId }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postReview({
            movieId,
            review,
            rating,
            username: localStorage.getItem('username')
        }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Rate from 1 to 5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required />
            </Form.Group>
            <Form.Group controlId="formBasicReview">
                <Form.Label>Review</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Review
            </Button>
        </Form>
    );
}

export default ReviewForm;