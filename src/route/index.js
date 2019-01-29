import React from "react";
import {Route,Redirect} from "react-router-dom";
import Auth from '../shared/auth';

export default ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            Auth.checkUsername() ? (<Component {...props}/>) : (<Redirect to='/'/>)
        }
    />
);