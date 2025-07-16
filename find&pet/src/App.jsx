import { useState,useEffect } from 'react'
import SideBar from './Components/sideBar'
import './App.css'
import Category from './Components/Category'
import PetCell from './Components/petCell'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

function App() {
  const types = ['Dog','Cat','Other Pets']
  const [Search, setSearch] = useState('')
  const [pets, setPets] = useState(null)
  const [category, setCategory] = useState('')

  useEffect(() => {
    const controller = new AbortController();
    console.log(ACCESS_KEY, SECRET_KEY);
    async function fetchData() {
      const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: ACCESS_KEY,
        client_secret: SECRET_KEY
      });

      const response = await fetch ('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });
      const data = await response.json();
      const accessToken = data.access_token
      const petResponse = await fetch('https://api.petfinder.com/v2/animals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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

    <div className='Main-Section'> 
      <SideBar></SideBar>
    </div>
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
