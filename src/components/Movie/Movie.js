import React, { Component } from 'react';
import { API_URL, API_KEY,API_NODEJS } from '../../config';
import { Redirect,withRouter } from 'react-router-dom';

import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid.js';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import * as actions from '../../store/action/auth';
class Movie extends Component {
    constructor(props){
        super(props);
        this.movieInfoElement = React.createRef();

    }
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  }

  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      // First fetch the movie ...
      let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

      this.fetchItems(endpoint);
    }
  }

  fetchItems = (endpoint) => {
    // ES6 destructuring the props
      console.log(endpoint);
    const { movieId } = this.props.match.params;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {

      if (result.status_code) {
        // If we don't find any movie
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result }, () => {
          // ... then fetch actors in the setState callback function
          let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
          fetch(endpoint)
          .then(result => result.json())
          .then(result => {

            const directors = result.crew.filter( (member) => member.job === "Director");

            this.setState({
              actors: result.cast,
              directors,
              loading: false
            }, () => {
              localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
            })
          })
        })
      }
    })
    .catch(error => console.error('Error:', error))
  }
wishlist=event=>{
    event.preventDefault();
    var token=JSON.parse(localStorage.getItem("token"));
    if(token)
    {
        const { movieId } = this.props.match.params;
        let item = JSON.parse(localStorage.getItem(`${movieId}`))
        let movieItem={};
        movieItem.UserId=this.props.UserId
        movieItem.movieId=movieId;
        movieItem.poster_path=item.movie.poster_path;
        movieItem.original_title=item.movie.original_title;
        fetch(API_NODEJS+"wishlist/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(movieItem)

        })
            .then((response) => response.json())
            .then((res) => {
                if(res.Error){
                    swal("Already Added", "This Movie Has Been Added Already");
                }else {
                    console.log("Successfull Wishlist"+res);
                    swal("Added To Wishlist", "This Movie Has Been Added To Your Wishlist");
                    this.movieInfoElement.current.changeWhishlistState();
                }



            })
            .catch((error) => {
                console.log("Error in post request")
            });


    }else {

        swal("Login", "Please login before add to wish");
    }


}
  render() {
    // ES6 Destructuring the props and state
    const { movieName } = this.props.location;
    const { movie, directors, actors, loading } = this.state;

    return (
      <div className="rmdb-movie">


        {movie ?
        <div>
          <Navigation movie={movieName} />
          <MovieInfo movie={movie} directors={directors} addwishlist={this.wishlist.bind(this)} ref={this.movieInfoElement} />
          <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
        </div>
        : null }
        {actors ?
        <div className="rmdb-movie-grid">
          <FourColGrid header={'Actors'}>
            {actors.map( (element, i) => (
              <Actor key={i} actor={element} />
            ))}
          </FourColGrid>
        </div>
        : null }
        {/* {!actors && !loading ? <h1>No movie found</h1> : null } */} 
        {loading ? <Spinner /> : null}
      </div>
    )
  }
}
const mapStateToProps=state=>{
    return{
        UserId:state.Id
    }
}

export default connect(mapStateToProps,null)(Movie);
