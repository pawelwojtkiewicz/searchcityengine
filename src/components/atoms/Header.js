import styled, { css } from 'styled-components';

const Header = styled.h1`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    margin: 0;

    ${({heroHeader}) => heroHeader &&  css`
        justify-content: center;
        margin: 20px 0 0 0;
        font-size: 2.5rem;
        text-align: center;
    `}
`;

export default Header;