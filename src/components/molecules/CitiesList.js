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
    const [cityOptions, setCityOptions] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
        {
            cityDescription: "",
            isLoading: false,
        }
    );
    const elementContent = useRef(null);

    const getCityDescription = cityName => {
        const baseURL = `https://en.wikipedia.org/w/api.php?action=query`;
        const additionalParams= `format=json&origin=*&explaintext&prop=extracts&explaintext&exintro&redirects=1&exsentences=5`

        setCityOptions({cityOptions: "", isLoading: true});
        fetch(`${baseURL}&${additionalParams}&titles=${cityName}`)
        .then(response => {
            if(!response.ok){
                console.log("error");
                setCityOptions({isLoading: false});
                return false;
            }
            return response.json();
        })
        .then(data => {
            const generalDescription = Object.values(data.query.pages);
            const getExactDescription = (array) => array.extract;
            setCityOptions({ cityDescription: getExactDescription(...generalDescription), isLoading: false });
        })
        .catch(error => {
            setCityOptions({isLoading: false});
            console.log("ERROR " + error);
        });
    }


    const toggleElements = cityName => {
        const showItem = () => {
            elementContent.current.style.display = "flex";
            if (cityOptions.cityDescription === "") getCityDescription(cityName);   
        }

        const hideItem = () => {
            elementContent.current.style.display = "none";
        }

        isVisible ? hideItem() : showItem();
        setVisibility(!isVisible);
    }
    
    return (
        <StyledWrapper>
            <StyledTitle>
                <h4>{cityName}</h4>
                <span>{population}</span>
                <button onClick={() => toggleElements(cityName)}>+</button>
            </StyledTitle>
            <StyledContent ref={elementContent}>
                {cityOptions.isLoading && <Loader />}
                {cityOptions.cityDescription !== "" && cityOptions.cityDescription} 
            </StyledContent>
        </StyledWrapper>
    );
}

export default CitiesList;