import styled, { css } from 'styled-components';

const Button = styled.button`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    outline: none;

    ${({MagnifyingGlass}) => MagnifyingGlass &&  css`
        position: absolute;
        right: 0;
        background: burlywood url(${MagnifyingGlass}) no-repeat;
        background-size: 50%;
        background-position: 50%;
    `}

    ${({ExpandButton, expanded}) => ExpandButton && css`
        background: url(${ExpandButton}) no-repeat;
        background-size: 50%;
        background-position: 50%;
        ${expanded && css`
            transform: rotate(180deg);
        `}
        transition: transform .5s;
    `}
`;

export default Button;