import React from "react";

const Category = ({type , onSubmit}) => {

    return (
    <button className="Category-Button" onClick={onSubmit}>
      {type}
    </button>    
    )
}

export default Category