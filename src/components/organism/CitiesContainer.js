import React from 'react';
import styled from 'styled-components';
import Loader from 'components/atoms/Loader';

const StyledWrapper = styled.div`
  
`;

const CitiesContainer = ({isLoading, citiesList}) => {
    return (
        <StyledWrapper>
            {isLoading && <Loader />}
            {citiesList.length > 0 && "Miasta"}
        </StyledWrapper>
    );
}
  
export default CitiesContainer;