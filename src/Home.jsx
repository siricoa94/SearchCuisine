import React from 'react';
import CuisineForm from './CuisineForm.jsx';
import NavBar from './Nav.jsx';

export default class Home extends React.Component {
    
    render() {
        return(
            <div id="homeContainer">
                <NavBar></NavBar>
                <div className="navTitle"><h1>Search Cuisine</h1></div>
                <div><CuisineForm /></div>
            </div>
        )
    }
}