import React, { Component } from 'react';
import * as config from '../../config';
import {connect} from 'react-redux';
import * as actions from '../../store/action/auth';
class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            Email: '',
            Password: '',
            error:''
        }
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submitForm= async e =>{
        try{
            e.preventDefault();
            console.log(this.state);
            fetch(config.API_NODEJS+"auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(this.state)

            })
                .then((response) => response.json())
                .then((res) => {

                    if(res.Error)
                    {
                        this.setState({error:res.Error});

                    }else {
                        localStorage.setItem('user',JSON.stringify(res));
                        localStorage.setItem('token',JSON.stringify(res._id));
                        this.props.onTryAuthSignIn(res);

                        this.props.history.push("/profile");
                    }


                })
                .catch((error) => {
                    console.log("Error in post request")
                });

        } catch(err){
            console.log("err", err);
        }




    };

    handleChange=e=>{
        e.preventDefault();
        const {name,value}=e.target;
        this.setState({
            [name]: value
        });
    }


    render() {
        return(
            <div className="container">
                <div><p style={{color:'red'}}> {this.state.error}</p></div>
                <form onSubmit={this.submitForm} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="Email" name="Email" onChange={this.handleChange}/>
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="Password" name="Password" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn red lighten z-depth-0" type="submit">Login</button>
                </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.First!==null
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onTryAuthSignIn:(res)=>dispatch(actions.signup(res))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

