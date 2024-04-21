import actionTypes from '../constants/actionTypes';

const env = process.env;

function reviewSubmitted(review) {
    return {
        type: actionTypes.REVIEW_SUBMITTED,
        review: review
    }
}

function reviewSubmissionFailed(error) {
    return {
        type: actionTypes.REVIEW_SUBMISSION_FAILED,
        error: error
    }
}

export function submitReview(reviewData) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') // Use the token from localStorage
            },
            body: JSON.stringify(reviewData),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            dispatch(reviewSubmitted(reviewData)); // Optionally adjust based on your actual success response
        }).catch((e) => {
            console.log(e);
            dispatch(reviewSubmissionFailed(e.toString()));
        });
    }
}
