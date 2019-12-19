import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDetectOutSideClick } from 'hooks/useDetectOutSideClick'
import SearchBar from 'components/molecules/SearchBar'
import SearchList from 'components/molecules/SearchList'

const StyledWrapper = styled.div`
   flex-direction: column;
   margin: 50px auto;
`;

const countryList = [
    {
        id: 1,
        countryName: "Poland",
        active: false,
        isoCode: 'PL',
    },
    {
        id: 2,
        countryName: "Germany",
        active: false,
        isoCode: 'DE',
    },
    {
        id: 3,
        countryName: "Spain",
        active: false,
        isoCode: 'ES',
    },
    {
        id: 4,
        countryName: "France",
        active: false,
        isoCode: 'FR',
    },
];

const getCities = async cityIso => {
    const baseURL = `https://api.openaq.org/v1/cities/?country=${cityIso}&order_by=count&sort=desc&limit=10`;   
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            
            return data.results;
        } catch(err){
            console.log(err);
        }
}

const getIsoCode = chosenCountry => {
    const country = countryList.find(country => country.countryName === chosenCountry);
    return country === undefined ? false : country.isoCode;
};

const SearchCitiesContainer = () => {
    const listOfElements = useRef(null);
    const [isListVisible, setListVisible] = useState(false);
    const [searchInputContent, setSearchInputContent] = useState("");
    const [activeOption, setNewActiveOption] = useState(0);
    const [searchedElements, getSearchedElements] = useState(countryList);
    const [sendButtonError, setSendButtonError] = useState(false);
    const [cityList, setCityList] = useState(null);

    useDetectOutSideClick(listOfElements, setListVisible);

    const handleShowCities = chosenCountry => {
        const isoCode = getIsoCode(chosenCountry);
        if(isoCode){
            setCityList([]);
            getCities(isoCode).then(( cityData => setCityList(cityData)));
        } else {
            console.log("Wrong typed country");
        }
    }
    
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
        }
    }

    const submitData = () => {
        searchInputContent === "" ? setSendButtonError(true) : handleShowCities(searchInputContent);
    }

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