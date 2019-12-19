import React from 'react';
import styled from 'styled-components';


const StyledWrapper = styled.div`
  
`;

const CitiesContainer = ({cityList}) => {
    let content;

    if (cityList === null){
        return "";
    } else if (cityList.length === 0){
        return "Ładowanie"
    } else if (cityList.length > 0){
        return "Miasta"
    }

    return (
        <StyledWrapper>
            {content}
        </StyledWrapper>
    );
}
  
export default CitiesContainer;