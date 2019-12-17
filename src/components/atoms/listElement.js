import React from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`{
  display: flex;
  align-items: center;
  height: 50px;
}`;

const ListElement = ({id, countryName, isoCode}) => (
  <StyledLi key={id} value={isoCode}>
    {countryName} 
  </StyledLi>
  );
  
  export default ListElement;