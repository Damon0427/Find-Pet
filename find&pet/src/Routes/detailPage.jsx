import React from "react";
import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getToken } from "../helper/auth";
import { Link } from "react-router-dom";

const query = `https://api.petfinder.com/v2/animals/`
const DetailPage = () => {

    const { id } = useParams();
    const [petDetails, setPetDetails] = useState(null);

    useEffect (() => {

        const getPetData = async () => {
            const token = await getToken(); // Assuming getToken is imported from auth.js
            const response = await fetch (`${query}${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const petData = await response.json();
            setPetDetails(petData.animal);
        }
        getPetData().catch(error => {
            console.error('Error fetching pet data:', error);
        });
    },[id])


    return (


        <div className="Detail-Screen">

            {petDetails ? (
                

                <div className="Pet-Details-Card">
                    <div className="Back-Link-Container">
            <Link to="/" className="Back-Link">← Back</Link>
        </div>
                    <div className="Pet-Details-Header">
                        
                        <h2 className="Pet-Name">{petDetails.name}</h2>
                    </div>
                    <div className="Pet-Details-Content">
                        <div className="Pet-Image-Container">
                            <img 
                                className="Pet-Detail-Image" 
                                src={petDetails.photos[0]?.medium} 
                                alt={petDetails.name} 
                            />
                        </div>
                        <div className="Pet-Info-Container">
                            <div className="Pet-Info-Item">
                                <span className="Info-Label">Type:</span>
                                <span className="Info-Value">{petDetails.type}</span>
                            </div>
                            <div className="Pet-Info-Item">
                                <span className="Info-Label">Breed:</span>
                                <span className="Info-Value">{petDetails.breeds.primary}</span>
                            </div>
                            <div className="Pet-Info-Item">
                                <span className="Info-Label">Age:</span>
                                <span className="Info-Value">{petDetails.age}</span>
                            </div>
                            <div className="Pet-Info-Item">
                                <span className="Info-Label">Gender:</span>
                                <span className="Info-Value">{petDetails.gender}</span>
                            </div>
                            <div className="Pet-Info-Item">
                                <span className="Info-Label">Description:</span>
                                <span className="Info-Value">{petDetails.description}</span>
                            </div>
                            <div className="Pet-Info-Item">
                                <span className="Info-Label">Link:</span>
                                <span className="Info-Value">
                                    <a href={petDetails.url} target="_blank" rel="noopener noreferrer">More About Me！</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="Loading-Container">
                    <p className="Loading-Text">Loading pet details...</p>
                </div>
            )}
        </div>
    )
}

export default DetailPage;