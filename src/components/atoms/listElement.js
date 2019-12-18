import React from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`{
  display: flex;
  align-items: center;
  height: 50px;
}`;

const ListElement = ({id, countryName, handleChoice, active}) => (
  <StyledLi key={id} onClick={handleChoice}>
    {countryName}
  </StyledLi>
  );
  
  export default ListElement;