import React from 'react';
import styled from 'styled-components';
import SearchElement from 'components/atoms/SearchElement'

const StyledWrapper = styled.ul`
    width: 300px;
    min-height: 50px;
    padding: 10px 0;
    margin: 10px 0 0 0;
    box-shadow: 0px 0px 44px -9px rgba(0,0,0,0.27);
    border-radius: 15px;
    color: #000000;
    border-radius: 15px;
    font-weight: 600;
    font-size: 16px;
    list-style-type: none;
    cursor: pointer;
`;

const SearchCitiesBar = ({
    setListVisible,
    searchedElements,
    handleChoice,
    removeActiveItem}) => {
    return (
        <StyledWrapper onClick={() => {removeActiveItem(); setListVisible(false)}}>
            {
                searchedElements.length !== 0 ? 
                    searchedElements.map(item => 
                        <SearchElement
                            handleChoice={handleChoice} 
                            key={item.id} 
                            countryName={item.countryName}
                            active={item.active}
                        />) : 
                    <SearchElement countryName={"no cities"}/>
            }  
        </StyledWrapper>
    );
}
  
export default SearchCitiesBar;