import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDetectOutSideClick } from 'hooks/useDetectOutSideClick'
import SearchBar from 'components/molecules/SearchBar'
import SearchList from 'components/molecules/SearchList'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px auto;
`;

const SearchCitiesContainer = ({handleShowCities, countryList}) => {
    const listOfElements = useRef(null);
    const [isListVisible, setListVisible] = useState(false);
    const [searchInputContent, setSearchInputContent] = useState("");
    const [activeOption, setNewActiveOption] = useState(0);
    const [searchedElements, getSearchedElements] = useState(countryList);
    const [sendButtonError, setSendButtonError] = useState(false);
    useDetectOutSideClick(listOfElements, setListVisible);

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
            default: return;
        }
    }

    const submitData = () => {
        searchInputContent === "" ? setSendButtonError(true) : handleShowCities(searchInputContent);
    }

    useEffect(() => {
        const handleSavedValue = () => {
            if (localStorage.getItem('chosenCountry')  !== null) setSearchInputContent(localStorage.getItem('chosenCountry'));
        }
        handleSavedValue();
    }, []);

    return (
        <StyledWrapper ref={listOfElements}>
            <SearchBar
                setListVisible={setListVisible} 
                searchInputContent={searchInputContent} 
                sendButtonError={sendButtonError} 
                handleInputChange={handleInputChange} 
                removeActiveItem={removeActiveItem} 
                submitData={submitData} 
                onKeyDown={onKeyDown}
            />
            {isListVisible && (
                <SearchList 
                    setListVisible={setListVisible} 
                    searchedElements={searchedElements} 
                    handleChoice={handleChoice} 
                    removeActiveItem={removeActiveItem} 
                    onKeyDown={onKeyDown}
                />
            )}
        </StyledWrapper>
    );
}
  
export default SearchCitiesContainer;