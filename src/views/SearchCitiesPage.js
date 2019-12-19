import React, { useReducer } from 'react';
import styled from 'styled-components';
import Search from 'components/organism/Search';
import CitiesContainer from 'components/organism/CitiesContainer';

const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
    flex-direction: column;
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

const SearchCitiesPage = () => {
    const [citiesOptions, setCitiesOptions] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
        {
            citiesList: [],
            isLoading: false,
        }
    );

    const getCities = async cityIso => {
        const baseURL = `https://api.openaq.org/v1/cities/?country=${cityIso}&order_by=count&sort=desc&limit=10`;   
        setCitiesOptions({isLoading: true});
        try {
            fetch(baseURL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Error fetch!"); //modal
                }
            })
            .then(response => {
                const cities = response.results
                setCitiesOptions({citiesList: cities, isLoading: false});
            })
            .catch(error => {
                setCitiesOptions({isLoading: false});
                console.log(error); //modal
            });
        } catch(error){
            setCitiesOptions({isLoading: false});
            console.log(error); //modal
        }
    }

    const getIsoCode = chosenCountry => {
        const country = countryList.find(country => country.countryName === chosenCountry);
        return country === undefined ? false : country.isoCode;
    };

    const handleShowCities = chosenCountry => {
        const isoCode = getIsoCode(chosenCountry);
        if(isoCode) getCities(isoCode).then(( cityData => setCitiesOptions({citiesList: cityData})));
        else console.log("Wrong typed country"); //modal
    }
    
    return (
        <StyledWrapper>
            <Search 
                handleShowCities={handleShowCities} 
                countryList={countryList} 
            />
            {citiesOptions.isLoading ? "Loading" : null}
            {/* <CitiesContainer cityList={cityList}/> */}
        </StyledWrapper>  
    )
}

export default SearchCitiesPage;