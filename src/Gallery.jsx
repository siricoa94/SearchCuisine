import React from 'react';
import WineForm from './WineForm.jsx';
import NavBar from './Nav.jsx';

export default class Gallery extends React.Component {
    render() {
        return(
            <div id="galleryContainer"  data-scroll-speed="9" >
                <NavBar></NavBar>
                <div className="navTitle"><h1>Search Wine</h1></div>
                <div><WineForm /></div>
            </div>
        )
    }
}