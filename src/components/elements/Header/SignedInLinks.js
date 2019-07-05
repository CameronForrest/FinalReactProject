import React from 'react'
import { NavLink } from 'react-router-dom'



class SignedInLinks extends React.Component{
    constructor(props){
        super(props);

    }



    render(){
        return(
            <ul className="right">
                 <li><NavLink to='/Profile'>WishList</NavLink></li>
                <li><input type="submit" value="Log Out" style={{background:'#212121',color:'white',border:'0px'}} onClick={this.props.appLogout}/></li>
                <li><NavLink to='/' className='btn btn-floating red lighten'>NN</NavLink></li>
            </ul>
        )
    }
}


export default SignedInLinks;
