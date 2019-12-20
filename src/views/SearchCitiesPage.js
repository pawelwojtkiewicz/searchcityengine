import React, { useReducer } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications'
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
    const { addToast } = useToasts();
    const [citiesOptions, setCitiesOptions] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
        {
            citiesList: [],
            isLoading: false,
        }
    );

    const getCitiesOrderByPopulation = countryIso => {
        const baseURL = `https://api.openaq.org/v1/cities/`;
        const sortingOptions= `order_by=count&sort=desc`
        const itemsLimit = 10;

        setCitiesOptions({citiesList: [], isLoading: true});
        fetch(`${baseURL}?country=${countryIso}&${sortingOptions}&limit=${itemsLimit}`)
        .then(response => {
            if(!response.ok){
                setCitiesOptions({citiesList: [], isLoading: false});
                addToast("Error downloading cities, please try again later.", { appearance: 'error', autoDismiss: true, });
                return false;
            }
            return response.json();
        })
        .then(response => {
            const cities = response ? response.results : [];
            setCitiesOptions({ citiesList: cities, isLoading: false });
        })
        .catch(error => {
            setCitiesOptions({ isLoading: false });
            return addToast("Error downloading cities, please try again later.", { appearance: 'error', autoDismiss: true, });
        });
    }

    const getIsoCode = chosenCountry => {
        const country = countryList.find(country => country.countryName === chosenCountry);
        return country === undefined ? false : country.isoCode;
    };

    const handleShowCities = chosenCountry => {
        const isoCode = getIsoCode(chosenCountry);
        if (isoCode) {
            localStorage.setItem('chosenCountry', `${chosenCountry}`)
            getCitiesOrderByPopulation(isoCode);
        }
        else addToast("Invalid country selected.", { appearance: 'error', autoDismiss: true, });;
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