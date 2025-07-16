import React from "react";

const SideBar = () => {

    return (
        <div className = "sideBar">
            <h2> Find&Pet </h2>
            <h3 onClick={() => window.location.reload()}>🏠 Home</h3>
            <h3 onClick={() => window.location.reload()}>🔍 Search</h3>
            <h3 onClick={() => window.location.reload()}>ℹ️ About</h3>

        </div>


    )


}

export default SideBar;