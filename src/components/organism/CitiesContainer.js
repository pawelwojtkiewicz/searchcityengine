import React from 'react';
import styled from 'styled-components';


const StyledWrapper = styled.div`
  
`;

const CitiesContainer = ({isLoading, citiesList}) => {
    //let content;

    // if (cityList === null){
    //     return "";
    // } else if (cityList.length === 0){
    //     return "Ładowanie"
    // } else if (cityList.length > 0){
    //     return "Miasta"
    // }

    return (
        <StyledWrapper>
            {isLoading && "Loading"}
            {citiesList.length > 0 && "Miasta"}
        </StyledWrapper>
    );
}
  
export default CitiesContainer;