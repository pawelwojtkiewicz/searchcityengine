import React from 'react';
import styled from 'styled-components';
import Input from 'components/atoms/Input'

const StyledWrapper = styled.div`

`;

const SearchCitiesBar = () => (
    <StyledWrapper>
        <Input className="search"/>
    </StyledWrapper>
  );
  
  export default SearchCitiesBar;