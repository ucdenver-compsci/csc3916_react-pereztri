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



export function postReview(reviewData) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Make sure token is retrieved correctly
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });  // Handling non-JSON responses
            }
            return response.json();
        })
        .then(json => {
            if (json.success) {
                alert('Review submitted successfully!');
            } else {
                throw new Error('Failed to submit review');
            }
        })
        .catch(e => {
            console.log('Error submitting review:', e);
            alert(`Error submitting review: ${e.message}`);
        });
    };
}

