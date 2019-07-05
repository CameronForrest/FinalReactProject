import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from "react-router-dom";


/* HOC component as a wraper of Route */
function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('user') ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/SignIn"

                        }}
                    />
                )
            }
        />
    );
}


function LoginRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                !localStorage.getItem('user') ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to ="/profile"
                    />
                )
            }
        />
    );
}

export {PrivateRoute, LoginRoute}