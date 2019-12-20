import React, { useState, useRef, useReducer } from 'react';
import styled from 'styled-components';
import Loader from 'components/atoms/Loader';

const StyledWrapper = styled.div`
    flex-direction: column;
    width: 100%;
    padding: 15px;
    box-shadow: 0px 0px 44px -9px rgba(0,0,0,0.27);
    border-radius: 10px;
    margin: 0 0 20px 0;
    cursor: pointer;

    transition: height .25s ease;
    overflow: hidden;
`;

const StyledTitle = styled.div`

`;

const StyledContent = styled.div`
    display: none;
`;

const CitiesList = ({cityName, population}) => {
    const [isVisible, setVisibility] = useState(false);
    const [cityOptions, setcityOptions] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
        {
            cityDescription: "",
            isLoading: false,
        }
    );
    const elementContent = useRef(null);

    const getCityDescription = countryIso => {
        const baseURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&explaintext&prop=extracts&explaintext&exintro&redirects=1&exsentences=5&titles=Warszawa`;
        setcityOptions({cityOptions: "", isLoading: true});
        try {
            const response = fetch(baseURL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setcityOptions({isLoading: false});
                    console.log("ERROR");
                    return false; 
                }
              })
            const data = response;
            return data;
        } catch(error){
            setcityOptions({isLoading: false});
            console.log('ERROR ' + error); //modal
        }
    }

    const toggleElements = event => {
        const showItem = () => {
            elementContent.current.style.display = "flex";
            getCityDescription().then(( response => {
                const a0 = Object.values(response.query.pages);
                const a1 = (array) => array.extract;
                console.log(a1(...a0));
                //const cities = response ? response.results : [];
                //setCitiesOptions({citiesList: cities, isLoading: false});
            }));
        }

        const hideItem = () => {
            elementContent.current.style.display = "none";
        }

        isVisible ? hideItem() : showItem();
        setVisibility(!isVisible);
    }

    return (
        <StyledWrapper onClick={toggleElements}>
            <StyledTitle>
                <h4>{cityName}</h4>
                <span>{population}</span>
            </StyledTitle>
            <StyledContent ref={elementContent}>
                {cityOptions.isLoading && <Loader />}
                {cityOptions.cityDescription !== "" && cityOptions.cityDescription} 
            </StyledContent>
        </StyledWrapper>
    );
}
// margin: 0;
// font-size: 1.7rem;
export default CitiesList;