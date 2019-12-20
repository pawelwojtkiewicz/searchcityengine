import React from 'react';
import styled from 'styled-components';
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import MagnifyingGlass from 'assets/icons/magnifyingGlass.svg';

const StyledWrapper = styled.div`
    position: relative;
    display: flex;
    height: fit-content;
`;

const SearchBar = ({
    setListVisible,
    searchInputContent,
    sendButtonError,
    handleInputChange,
    removeActiveItem,
    submitData,
    onKeyDown}) => {

    return (
        <StyledWrapper >
            <Input 
                value={searchInputContent} 
                placeholder="Choose country"
                buttonError={sendButtonError}
                onClick={() => 
                    {
                        removeActiveItem();
                        setListVisible(true);
                    }
                }
                onChange={handleInputChange} 
                onKeyDown={onKeyDown}
            />
            <Button 
                onClick={submitData}
                MagnifyingGlass={MagnifyingGlass}
            />
        </StyledWrapper>
    );
}
  
export default SearchBar;