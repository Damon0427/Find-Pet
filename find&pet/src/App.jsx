import { useState,useEffect } from 'react'
import './App.css'
import Category from './Components/Category'
import PetCell from './Components/petCell'
import { getToken } from './helper/auth';
import React from 'react';
import Graph from './Routes/graph';
function App() {
  const types = ['Dog','Cat','Other Pets']
  const [Search, setSearch] = useState('')
  const [pets, setPets] = useState(null)
  const [category, setCategory] = useState('')

  useEffect(() => {

    async function fetchData() {

      const token = await getToken();
      const petResponse = await fetch('https://api.petfinder.com/v2/animals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      const petData = await petResponse.json();
      const petsWithImages = petData.animals.filter(pet => {
        return pet.photos && pet.photos.length > 0
      });

      setPets(petsWithImages);
      }
      fetchData().catch(error => {
        console.error('Error fetching data:', error) 
      });
  }, [])
      const filteredPets = pets?.filter(pet => {
        const searchLower = Search.toLowerCase();

        const nameMatch = pet.name?.toLowerCase().includes(searchLower);
        const breedMatch = pet.breeds?.primary?.toLowerCase().includes(searchLower);
        const typeMatchSearch = pet.type?.toLowerCase().includes(searchLower);

        const searchMatch = nameMatch || breedMatch || typeMatchSearch;

        const categoryMatch = category ? pet.type === category : true;

        return searchMatch && categoryMatch;
      });


  return (
    <>


    <div className='Main-Screen'>
      <h2 className='displayh2'>Find Your Pet:</h2>
            <input 
        className='Search-Input'
        type="text"
        placeholder="Search anything about pet!"
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className = "Category-Section"> 
      {
        types.map(type => (
          <Category 
            key = {type}
            type = {type}
            onSubmit={() => setCategory(type)}
          />
        ))
      }
      </div>
      <div className="Graph-Section">
        <Graph pets={pets} />
      </div>
      <hr />
      
      <h2 className='displayh2'>Result:</h2>
      {pets &&
          <div className="Dashboard-Summary">
            <p>🐾 Total Pets: {pets.length}</p>
            <p>🐶 Dogs: {pets.filter(p => p.type === 'Dog').length}</p>
            <p>🐱 Cats: {pets.filter(p => p.type === 'Cat').length}</p>
          </div>
      }

      <div className="Pet-List">
          {filteredPets?.length > 0 ? (
            filteredPets.map(pet => (
              <PetCell key={pet.id} pet={pet} />
            ))
          ) : (
            <p>No pets found.</p>
          )}
        </div>

      
    </div>
    </>
  )
}

export default App
