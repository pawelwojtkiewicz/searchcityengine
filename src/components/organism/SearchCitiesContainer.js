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

const getCities = async cityIso => {
    const baseURL = `https://api.openaq.org/v1/cities/?country=${cityIso}&order_by=count&sort=desc&limit=10`;   
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            
            return data.results;
        } catch(err){
            console.log(err);
        }
}

const getIsoCode = chosenCountry => {
    const country = countryList.find(country => country.countryName === chosenCountry);
    return country === undefined ? false : country.isoCode;
};

const SearchCitiesContainer = () => {
    const [cityList, setCityList] = useState(null);
    const [sendButtonError, setSendButtonError] = useState(false);

    const handleShowCities = chosenCountry => {
        const isoCode = getIsoCode(chosenCountry);
        if(isoCode){
            setCityList([]);
            getCities(isoCode).then(( cityData => setCityList(cityData)));
        } else {
            console.log("Wrong typed country");
        }
    }

    const Aaa = () => {
        if (cityList === null) {
            return "Nie ma nic";
          } else if (cityList.length === 0) {
            return "Ładowanie"
          } else if (cityList.length > 0 ){
            return "Som oferty"
          }
    }


    



    console.log(cityList)
    return (
        <StyledWrapper>
            <SearchCitiesBar countryList={countryList} sendButtonError={sendButtonError} setSendButtonError={setSendButtonError} handleShowCities={handleShowCities}/>
            <Aaa />
        </StyledWrapper>
    );
}
  
export default SearchCitiesContainer;