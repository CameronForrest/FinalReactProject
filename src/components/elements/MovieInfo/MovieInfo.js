import React from 'react';
import SweetAlert from 'sweetalert-react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE,API_NODEJS } from '../../../config';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

class MovieInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
        show:false
    }
  }

  changeWhishlistState(){
    console.log("Chile called");
      this.setState({show:true})
  }

  componentDidMount(){


      fetch(API_NODEJS+"wishlist/"+this.props.movie.id, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },


      })
          .then((response) => response.json())
          .then((res) => {
              if(res==1){
               this.setState({show:true})

              }



          })
          .catch((error) => {
              console.log("Error in post request")
          });
  }

  render(){
    return(
        <div className="rmdb-movieinfo"
             style={{
                 background: this.props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.props.movie.backdrop_path}')` : '#000'
             }}
        >
          <div className="rmdb-movieinfo-content">
            <div className="rmdb-movieinfo-thumb">
              <MovieThumb
                  image={this.props.movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${this.props.movie.poster_path}` : './images/no_image.jpg'}
                  clickable={false}
              />
            </div>
            <div className="rmdb-movieinfo-text">

                {
                  this.state.show==true?
                      <span className="badge badge-primary" style={{color:'white'}} >Saved</span>

                      :
                       <span className="badge badge-primary" >
                    <input type="submit" className="badge badge-primary" value="Add to wish List" onClick={this.props.addwishlist} style={{border:'0px',color:'white',backgroundColor:'transparent',cursor:'pointer'}}/>
                    </span>
                }

              <h1>{this.props.movie.title}</h1>
              <h3>PLOT</h3>
              <p>{this.props.movie.overview}</p>
              <h3>IMDB RATING</h3>
              <div className="rmdb-rating">
                <meter min="0" max="100" optimum="100" low="40" high="70" value={ this.props.movie.vote_average * 10}></meter>
                <p className="rmdb-score">{this.props.movie.vote_average}</p>
              </div>
                {this.props.directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
                {this.props.directors.map( (element, i) => {
                    return <p key={i} className="rmdb-director">{element.name}</p>
                })}
            </div>
            <FontAwesome className="fa-film" name="film" size="5x" />
          </div>
        </div>
    )
  }


}




MovieInfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.array
}

export default MovieInfo;