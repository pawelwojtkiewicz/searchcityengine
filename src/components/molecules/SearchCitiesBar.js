import React, { useState, useRef, useReducer } from 'react';
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

const SearchCitiesBar = () => {
    const [isListVisible, setListVisible] = useState(false);
    const listOfElements = useRef(null);
    useDetectOutSideClick(listOfElements, setListVisible)

    const [inputContent, setInputContent] = useReducer(
        ( state, newState ) => ({ ...state, ...newState }), { searchInputContent: "" }
    );

    const [activeOption, setNewActiveOption] = useState(0);

    const [itemList, setItemList] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
            [
                {
                    id: 1,
                    countryName: "Poland",
                    active: 'false',
                },
                {
                    id: 2,
                    countryName: "Germany",
                    active: 'false',
                },
                {
                    id: 3,
                    countryName: "Spain",
                    active: 'false',
                },
                {
                    id: 4,
                    countryName: "France",
                    active: 'false',
                },
            ]
    );

    const [searchedElements, getSearchedElements] = useState(itemList);

    const handleKeyPress = () => {
        getSearchedElements(
          itemList.filter(item =>
            item.countryName
              .toUpperCase()
              .startsWith(inputContent.searchInputContent.toUpperCase())
          )
        );
    }; 
    
    const handleInputChange = event => setInputContent({ "searchInputContent": event.target.value });

    const handleChoice = event => {
        setInputContent({ "searchInputContent": event.target.innerText });
        getSearchedElements(itemList.filter(item => item.countryName === event.target.innerText));
    };

    const removeActiveItem = () => {
        setNewActiveOption(0);
        searchedElements.find(element => element.active ? element.active = !element.active : null);
    };

    const onKeyDown = event => {
        switch(event.keyCode){
            case 13:
                const newInputContent = searchedElements.find(element => element.active);
                setInputContent({ "searchInputContent": newInputContent.countryName });
                setListVisible(false)
                break;
            case 40:
                if(activeOption === searchedElements.length) return;
                setNewActiveOption(activeOption + 1);
                searchedElements.map((item, index) => (index + 1) === activeOption + 1 ? item.active = true : item.active = false);
                
                break;
            case 38:
                if(activeOption === 0) return
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
                value={inputContent.searchInputContent} 
                onClick={() => {removeActiveItem(); setListVisible(true)}}
                onKeyUp={handleKeyPress} 
                onChange={handleInputChange} 
                onKeyDown={onKeyDown} />
            <Button />
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