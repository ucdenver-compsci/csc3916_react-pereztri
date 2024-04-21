import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchMovie } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail"
import { BsStarFill } from 'react-icons/bs';

// support routing

class Movie extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actorName}</b> {actor.characterName}
                </p>
            )
        }

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.username}</b> {review.review}
                    {/* <Glyphicon glyph={'star'} /> {review.rating} */}
                    <BsStarFill /> {review.rating}
                </p>
            )
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { //if not could still be fethcin the movie
                return <div>Loading...</div>;
            }
            return (
                <Card>
                    <Card.Heading>Movie Detail</Card.Heading>
                    <Card.Body><Image className="image" src={currentMovie.imageUrl} thumbnail /></Card.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        {/* <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentMovie.avgRating} </h4></ListGroupItem> */}
                        <ListGroupItem><h4><BsStarFill/> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body><ReviewInfo reviews={currentMovie.reviews} /></Card.Body>
                </Card>
            );
        }

        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    const movieId = ownProps.match.params.movieId;
    return {
        selectedMovie: state.movie.selectedMovie, 
        movieId: movieId
        // movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));

// function Movie(props) {
//     const [selectedMovie] = useState(props.selectedMovie);
//     const params = useParams();
//     const movieId = params.movieId;
//     console.log(movieId);
//     const dispatch = useDispatch();
//     if (selectedMovie == null) {
//         dispatch(fetchMovie(movieId));
//     }

//     return (<MovieDetail movieId={movieId} />)
// }

// export default Movie;