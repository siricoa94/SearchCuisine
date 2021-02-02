import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {
    render() {
        return(
            <div>
                <nav id="nav">
                    <span><NavLink exact to="/"><button className="navBtn">Cuisine</button></NavLink></span>
                    <span><NavLink to="/gallery"><button className="navBtn">Wine</button></NavLink></span>
                </nav>
           </div>
        )
    }
}