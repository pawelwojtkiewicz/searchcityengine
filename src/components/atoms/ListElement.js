import React from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`{
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 25px;

  &.active{
    background-color: #eae3e36b;
  }

  &:hover{
    background-color: #eae3e36b;
  }
}`;

const ListElement = ({id, countryName, handleChoice, active}) => (
  <StyledLi className={active && "active"} key={id} onClick={handleChoice}>
    {countryName} 
  </StyledLi>
);

export default ListElement;
