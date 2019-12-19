import React, { useState, useRef, useReducer } from 'react';
import { useDetectOutSideClick } from 'hooks/useDetectOutSideClick'
import styled from 'styled-components';
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import ListElement from 'components/atoms/ListElement';
import MagnifyingGlass from 'assets/icons/magnifyingGlass.svg';

const StyledWrapper = styled.div`
    position: relative;
    flex-direction: column;
    height: fit-content;
    margin: 100px auto 0 auto;
`;

const ListWrapper = styled.ul`
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
`;

const SearchCitiesBar = ({countryList, sendButtonError, setSendButtonError, getCities}) => {
    const [isListVisible, setListVisible] = useState(false);
    const listOfElements = useRef(null);
    useDetectOutSideClick(listOfElements, setListVisible)

    const [searchInputContent, setSearchInputContent] = useState("");
    const [activeOption, setNewActiveOption] = useState(0);
    const [searchedElements, getSearchedElements] = useState(countryList);

    const handleInputChange = event => {
        const newInputContain = event.target.value;

        getSearchedElements(
            countryList.filter(item =>
              item.countryName
                .toUpperCase()
                .startsWith(newInputContain.toUpperCase())
            )
          );

        setSearchInputContent(newInputContain);
        setSendButtonError(false);
    }
    
    const handleChoice = event => {
        setSearchInputContent(event.target.innerText);
        getSearchedElements(countryList.filter(item => item.countryName === event.target.innerText));
        setSendButtonError(false);
    };

    const removeActiveItem = () => {
        setNewActiveOption(0);
        searchedElements.find(element => element.active ? element.active = !element.active : null);
    };

    const submitData = () => {
        searchInputContent.searchInputContent === "" ? setSendButtonError(true) : getCities(searchInputContent);
    }

    const onKeyDown = event => {
        const enter = 13;
        const arrowUp = 40;
        const arrowDown = 38;

        switch(event.keyCode){
            case enter:
                const newInputContent = searchedElements.find(element => element.active);
                setListVisible(false);
                if(newInputContent === undefined) return;
                setSearchInputContent(newInputContent.countryName);
                break;
            case arrowUp:
                if(activeOption === searchedElements.length) return;
                setNewActiveOption(activeOption + 1);
                searchedElements.map((item, index) => (index + 1) === activeOption + 1 ? item.active = true : item.active = false);
                break;
            case arrowDown:
                if(activeOption === 0) return;
                setNewActiveOption(activeOption - 1);
                searchedElements.map((item, index) => (index + 1) === activeOption - 1 ? item.active = true : item.active = false);
                break; 
        }
    }

    return (
        <StyledWrapper ref={listOfElements}>
            <Input 
                className="search" 
                name="searchInputContent"
                value={searchInputContent} 
                placeholder="Choose country"
                buttonError={sendButtonError}
                onClick={() => {removeActiveItem(); setListVisible(true)}}
                onChange={handleInputChange} 
                onKeyDown={onKeyDown} />
            <Button onClick={submitData} MagnifyingGlass={MagnifyingGlass}/>
            {isListVisible && (
                <ListWrapper onClick={() => {removeActiveItem(); setListVisible(false)}}>
                    {
                        searchedElements.length !== 0 ? 
                        searchedElements.map(item => 
                        <ListElement
                            handleChoice={handleChoice} 
                            key={item.id} 
                            countryName={item.countryName}
                            active={item.active}
                        />) : 
                        <ListElement countryName={"no cities"}/>
                    }  
                </ListWrapper>
            )}   
        </StyledWrapper>
    );
}
  
export default SearchCitiesBar;