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

    const getCities = async countryIso => { //poprawić nazwę
        const baseURL = `https://api.openaq.org/v1/cities/?country=${countryIso}&order_by=count&sort=desc&limit=10`;   
        setCitiesOptions({isLoading: true});
        try {
            const response = await fetch(baseURL)
            // .then(response => {
            //     if (response.ok) {
            //       return response.json();
            //     } else {
            //         setCitiesOptions({isLoading: false});
            //         console.log("ERROR");
            //     }
            //   })
            const data = await response.json();

            return data;
        } catch(error){
            setCitiesOptions({isLoading: false});
            console.log('ERROR ' + error); //modal
        }
    }

    const getIsoCode = chosenCountry => {
        const country = countryList.find(country => country.countryName === chosenCountry);
        return country === undefined ? false : country.isoCode;
    };

    const handleShowCities = chosenCountry => {
        const isoCode = getIsoCode(chosenCountry);
        if(isoCode) getCities(isoCode).then(( response => {
            console.log(response)
            const cities = response ? response.results : [];
            setCitiesOptions({citiesList: cities, isLoading: false});
        }));
        else console.log("Wrong typed country"); //modal
    }

    return (
        <StyledWrapper>
            <Search 
                handleShowCities={handleShowCities} 
                countryList={countryList} 
            />
            <CitiesContainer
                isLoading={citiesOptions.isLoading} 
                citiesList={citiesOptions.citiesList}
            />
        </StyledWrapper>  
    )
}

export default SearchCitiesPage;