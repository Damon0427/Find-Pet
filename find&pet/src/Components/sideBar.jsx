import React from "react";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SideBar = () => {

    return (
        <div className = "sideBar">
            <h2> Find&Pet </h2>
            <h3>
                <Link to="/">🏠 Home</Link>
            </h3>
            <h3>
                <Link to="/search">🔍 Test </Link>
            </h3>

           
            <Outlet />

        </div>


    )


}

export default SideBar;