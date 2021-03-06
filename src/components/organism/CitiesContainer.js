import React from 'react';
import styled from 'styled-components';
import Loader from 'components/atoms/Loader';
import CitiesList from 'components/molecules/CitiesList'

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
    padding: 0 20px;
    margin: 0 auto;
`;

const CitiesContainer = ({isLoading, citiesList}) => {
    return (
        <StyledWrapper>
            {isLoading && <Loader />}
            {citiesList.length > 0 && 
                citiesList.map((name, index) => (
                    <CitiesList 
                        key={index} 
                        cityName={name} 
                    /> 
                ))
            } 
        </StyledWrapper>
    );
}

export default CitiesContainer;