import React, { useState, useRef, useEffect } from 'react';
import { useDetectOutSideClick } from 'hooks/useDetectOutSideClick'
import styled from 'styled-components';
import Input from 'components/atoms/Input'

const StyledWrapper = styled.div`

`;

const ListWrapper = styled.div`

`;

const SearchCitiesBar = () => {
    const [isListVisible, setListVisible] = useState(false);
    const searchInput = useRef(null);
    const listOfElements = useRef(null);

    useDetectOutSideClick(listOfElements, setListVisible)

    return (
        <StyledWrapper>
            <Input className="search"  ref={searchInput} onClick={() => setListVisible(true)} />
            {isListVisible && (
                <ListWrapper ref={listOfElements}>
                    Hello
                </ListWrapper>
            )}   
        </StyledWrapper>
    );
}
  
export default SearchCitiesBar;