import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './Header.css';
import * as actions from '../../../store/action/auth';
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    appLogout=e=>{

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        this.props.history.push('/')
    }
    render(){
        return (
            <nav className="nav-wrapper grey darken-4">
                <div className="container">
                    <Link to="/">
                        <img className="rmdb-logo" src="/images/reactMovie_logo.png" alt="rmdb-logo" />
                    </Link>
                    {
                        !localStorage.getItem("user")?
                            <SignedOutLinks  />
                            :<SignedInLinks appLogout={this.appLogout.bind(this)}  />
                    }


                </div>
            </nav>
        )
    }

}



const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(actions.logout())
    }
}
export default withRouter(connect(null,mapDispatchToProps)(Header));



