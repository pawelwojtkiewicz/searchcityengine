import React from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`{
  display: flex;
  align-items: center;
  height: 50px;
}`;

const ListElement = ({key, countryName, isoCode}) => (
  <StyledLi key={key} value={isoCode}>
    {countryName} 
  </StyledLi>
  );
  
  export default ListElement;