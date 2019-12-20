import React, { useState, useRef, useReducer } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications'
import Loader from 'components/atoms/Loader';
import Button from 'components/atoms/Button'
import Header from 'components/atoms/Header'
import ExpandButton from 'assets/icons/expandButton.svg';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    box-shadow: 0px 0px 44px -9px rgba(0,0,0,0.27);
    border-radius: 10px;
    margin: 0 0 20px 0;
    cursor: pointer;
    overflow: hidden;
    transition: transform .5s;
`;

const StyledTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledContent = styled.div`
    display: none;
`;

const CitiesList = ({cityName}) => {
    const { addToast } = useToasts();
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
                setCityOptions({isLoading: false});
                return addToast("Error downloading city description, please try again later.", { appearance: 'error', autoDismiss: true, });
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
            return addToast("Error downloading city description, please try again later.", { appearance: 'error', autoDismiss: false, });
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
                <Header>
                    {cityName}
                </Header>
                <Button 
                    ExpandButton={ExpandButton}
                    expanded={isVisible}
                    onClick={() => toggleElements(cityName)}
                />
            </StyledTitle>
            <StyledContent ref={elementContent}>
                {cityOptions.isLoading && <Loader />}
                {cityOptions.cityDescription !== "" && cityOptions.cityDescription} 
            </StyledContent>
        </StyledWrapper>
    );
}

export default CitiesList;