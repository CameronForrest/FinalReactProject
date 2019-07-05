import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/action/auth';
import * as config from '../../config';
class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            Email: '',
            Password: '',
            First: '',
            Last: '',
            error:''
        }
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitForm= async e =>{
        try{
            e.preventDefault();
            console.log(this.state);
            fetch(config.API_NODEJS+"auth/", {
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
                    this.props.onTryAuthSignUp(res);
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
                <div style={{color: 'red'}}>  {this.state.error}</div>
                <form onSubmit={this.submitForm} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="Email" name="Email" onChange={this.handleChange}/>
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="Password" name="Password" onChange={this.handleChange}/>
                </div>

                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="First" name="First" onChange={this.handleChange}/>
                </div>

                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="Last" name="Last" onChange={this.handleChange}/>
                </div>

                <div className="input-field">
                    <button className="btn red lighten z-depth-0" type="submit">Sign Up</button>
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
        onTryAuthSignUp:(res)=>dispatch(actions.signup(res))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
//export default SignUp;