import React, { useReducer } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications'
import Search from 'components/organism/Search';
import CitiesContainer from 'components/organism/CitiesContainer';
import Header from 'components/atoms/Header'

const StyledWrapper = styled.div`
    display: flex;
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

    const filterCityDuplicates = (citiesList) => {
        const filteredCities = [];
        for (let i = 0; i < citiesList.length; i++){
            if(i === 0) filteredCities.push(citiesList[i].city);
            if(filteredCities.length === 10) break;
            const result = filteredCities.find(city => city === citiesList[i].city);
            result === undefined && filteredCities.push(`${citiesList[i].city}`);
        }
        return filteredCities
    }

    const getCitiesOrderByPopulation = countryIso => {
        const baseURL = `https://api.openaq.org/v1/measurements/`;
        const sortingOptions= `parameter=co&order_by=value&sort=desc`

        setCitiesOptions({citiesList: [], isLoading: true});
        fetch(`${baseURL}?country=${countryIso}&${sortingOptions}`)
        .then(response => {
            if(!response.ok){
                setCitiesOptions({citiesList: [], isLoading: false});
                addToast("Error downloading cities, please try again later.", { appearance: 'error', autoDismiss: true, });
                return false;
            }
            return response.json();
        })
        .then(response => {
            const cities = filterCityDuplicates(response.results)
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
            <Header heroHeader>
                Choose or type country and check 10 most polluted towns
            </Header>
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