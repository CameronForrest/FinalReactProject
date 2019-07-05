import React from 'react';
import MovieThumb from '../../elements/MovieThumb/MovieThumb';
import FourColGrid from '../../elements/FourColGrid/FourColGrid';
import * as config from '../../../config';
import axios from 'axios';
import * as actionTypes from '../../../store/action/actionTypes';
import {connect} from 'react-redux';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movies: []

        }
        console.log("constructor: "+JSON.stringify(this.state));

    }
    async componentDidMount(){
var token=JSON.parse(localStorage.getItem("token"));
        const res = await axios(config.API_NODEJS+"wishlist/userlist/"+token);
        var resData= await res.data;


        this.setState({ ...resData })
        console.log("after: "+JSON.stringify(this.state));
    }
    render(){
        const { movies } = this.state;
        return(
            <div>

                <h3 style={{textAlign:'center'}}>User Profile</h3>
                <div className="rmdb-home">

                    <div className="rmdb-home-grid">
                        <FourColGrid
                            header={ 'Wishlist Movies'}
                            loading={false}
                        >
                            {movies.map( (element, i) => (
                                <MovieThumb
                                    key={i}
                                    clickable={false}
                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                                    movieId={element.movieId}
                                    movieName={element.original_title}
                                />
                            ))}
                        </FourColGrid>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        userId:state.Id!==null
    }
}


export default connect(mapStateToProps,null)(Profile);
