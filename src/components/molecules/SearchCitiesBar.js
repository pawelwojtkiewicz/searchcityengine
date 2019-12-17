import React, { useState, useRef, useReducer, useEffect } from 'react';
import { useDetectOutSideClick } from 'hooks/useDetectOutSideClick'
import styled from 'styled-components';
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import ListElement from 'components/atoms/ListElement';

const StyledWrapper = styled.div`
    position: relative;
    flex-direction: column;
    height: fit-content;
    margin: 100px auto 0 auto;
`;

const ListWrapper = styled.ul`
    width: 300px;
    min-height: 50px;
    padding: 10px 25px;
    margin: 10px 0 0 0;
    box-shadow: 0px 0px 44px -9px rgba(0,0,0,0.27);
    border-radius: 15px;
    color: #000000;
    border-radius: 15px;
    font-weight: 600;
    font-size: 16px;
    list-style-type: none;
`;

const SearchCitiesBar = () => {
    const [isListVisible, setListVisible] = useState(false);
    const listOfElements = useRef(null);
    useDetectOutSideClick(listOfElements, setListVisible)

    const [inputContent, setInputContent] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
        {
            searchInputContent: "",
        }
    );

    const [itemList, setItemList] = useState([
        {
            id: "1",
            countryName: "Poland",
            isoCode: "PL",
        },
        {
            id: "2",
            countryName: "Germany",
            isoCode: "DE",
        },
        {
            id: "3",
            countryName: "Spain",
            isoCode: "ES",
        },
        {
            id: "4",
            countryName: "France",
            isoCode: "F",
        },
    ]);

    const handleInputChange = event => {
        setInputContent({
            [event.target.name]: event.target.value
        });
    }

    

    

    return (
        <StyledWrapper onClick={() => setListVisible(true)} ref={listOfElements}>
            <Input className="search" onChange={handleInputChange} name="searchInputContent" value={inputContent.searchInputContent}/>
            <Button />
            {isListVisible && (
                <ListWrapper>
                    {itemList
                    .filter(item => item.countryName
                        .toUpperCase()
                        .startsWith(
                            inputContent.searchInputContent.toUpperCase()
                        ))
                    .map(({id, countryName, isoCode}) => <ListElement key={id} countryName={countryName} isoCode={isoCode}/> )}
                </ListWrapper>
            )}   
        </StyledWrapper>
    );
}
  
export default SearchCitiesBar;