
import React from 'react';


const PetCell = ({ pet }) => {
  const imageUrl = pet.photos?.[0]?.medium || 'https://via.placeholder.com/150';

  return (
    <div className="Pet-Cell">
      <img className='petImage' src={imageUrl} alt={pet.name} />
      <h3 className='petName'>{pet.name}</h3>
      <div className="pet-tags">
        <span className="tag">{pet.age}</span>
        <span className="tag">{pet.gender}</span>
        <span className="tag">{pet.breeds.primary}</span>
      </div>
      <div> 
        <a   className="info-button" href={pet.url} target='_blank'rel="noopener noreferrer"> 
            About Me
        </a>
      </div>

    </div>
  );
};


export default PetCell;