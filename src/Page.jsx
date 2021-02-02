import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import routes from './routes.js';

export default function Page () {
    return(
        <div>
            <Switch>
                <Redirect exact from="/" to="/home" />
                {routes.map(attrs => <Route {...attrs} key={attrs.path} />)}
            </Switch>
        </div>
    );
}