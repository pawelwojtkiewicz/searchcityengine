import React, { useState } from 'react';
import styled from 'styled-components';
import SearchCitiesBar from 'components/molecules/SearchCitiesBar'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
`;

const countryList = [
            {
                id: 1,
                countryName: "Poland",
                active: false,
                isoCode: 'PL',
            },
            {
                id: 2,
                countryName: "Germany",
                active: false,
                isoCode: 'DE',
            },
            {
                id: 3,
                countryName: "Spain",
                active: false,
                isoCode: 'ES',
            },
            {
                id: 4,
                countryName: "France",
                active: false,
                isoCode: 'FR',
            },
        ];

const getNewCities = city => {
    const baseURL = `https://api.openaq.org/v1/cities/?country=`;

    const getCities = async (city) => {
        try {
            const response = await fetch(`${baseURL}${city}`);
            const data = await response.json();
            
            return data.results;
        } catch(err){
            console.log(err);
        }
    }
}

const getCities = chosenCountry => {
    console.log(chosenCountry)
    const getIsoCode = countryList.filter(country => country.countryName === chosenCountry);
    console.log(getIsoCode);
}

const SearchCitiesContainer = () => {
    const [sendButtonError, setSendButtonError] = useState(false);

    return (
        <StyledWrapper>
            <SearchCitiesBar countryList={countryList} sendButtonError={sendButtonError} setSendButtonError={setSendButtonError} getCities={getCities}/>
            {/* Tutaj wyszukane divy */}
        </StyledWrapper>
    );
}
  
export default SearchCitiesContainer;