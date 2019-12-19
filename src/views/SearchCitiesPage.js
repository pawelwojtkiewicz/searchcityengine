import React from 'react';
import styled from 'styled-components';
import Search from 'components/organism/Search';

const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
    
`;

const SearchCitiesPage = () => (
    <StyledWrapper>
        <Search />
    </StyledWrapper>  
);

export default SearchCitiesPage;