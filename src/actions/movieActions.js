import actionTypes from '../constants/actionTypes';
//import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = process.env;

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

//Single Movie
function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

//Do I use movieId or title? Should be using movieId
export function fetchMovie(movieId) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            //Ensure res is treated as a single object
            const movie = Array.isArray(res) ? res[0] : res;
            dispatch(movieFetched(movie));
            // dispatch(movieFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function fetchMovies() {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(moviesFetched(res));
        }).catch((e) => console.log(e));
    }
}

//submitting a review and the review appears after you refresh the page
// export function postReview(reviewData) {
//     return dispatch => {
//         return fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('token')
//             },
//             body: JSON.stringify(reviewData)
//         })
//         .then(response => response.json())
//         .then(json => {
//             if (json.success) {
//                 alert('Review submitted successfully! Thank you for your submission. Your review will appear if you refresh the page.');
//             } else {
//                 alert('An error occured. Failed to submit review.');
//             }
//         })
//         .catch(e => {
//             console.log('Error submitting the review:', e);
//             alert(`Error submitting the review: ${e.message}`);
//         });
//     };
// }

//submitting a review and the review appears right after
export function postReview(reviewData) {
    return (dispatch, getState) => {
        return fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                alert('Review submitted successfully! Thank you for your submission. Your review will now appear below...');
                dispatch(fetchMovie(reviewData.movieId));
            } else {
                alert('An error occured. Failed to submit review.');
            }
        })
        .catch(e => {
            console.log('Error submitting the review:', e);
            alert(`Error submitting the review: ${e.message}`);
        });
    };
}