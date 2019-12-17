import React from 'react';
import styled from 'styled-components';
import SearchCitiesBar from 'components/molecules/SearchCitiesBar'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
`;

const SearchCitiesContainer = () => {
 
    return (
        <StyledWrapper>
            <SearchCitiesBar />
            {/* Tutaj wyszukane divy */}
        </StyledWrapper>
    );
}
  
export default SearchCitiesContainer;