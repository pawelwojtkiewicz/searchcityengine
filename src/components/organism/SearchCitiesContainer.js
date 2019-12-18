import React, { useState } from 'react';
import styled from 'styled-components';
import SearchCitiesBar from 'components/molecules/SearchCitiesBar'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
`;

const getNewCities = () => {
    const baseURL = `https://api.openaq.org/v1/cities/?country=`;
    const city = 'PL'
    const getCities = async (city) => {
        try {
            const response = await fetch(`${baseURL}${city}`);
            const data = await response.json();
            
            return data.results;
        } catch(err){
            console.log(err);
        }
    }  

    getCities('PL').then(data => {
    	console.log(data);
    });
}


const SearchCitiesContainer = () => {
    
    const [chosenCities, setNewCities] = useState("");

    const [sendButtonError, setSendButtonError] = useState(false);

    return (
        <StyledWrapper>
            <SearchCitiesBar sendButtonError={sendButtonError} setSendButtonError={setSendButtonError} getNewCities={getNewCities}/>
            {/* Tutaj wyszukane divy */}
        </StyledWrapper>
    );
}
  
export default SearchCitiesContainer;