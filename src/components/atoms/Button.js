import styled, { css } from 'styled-components';

const Button = styled.button`
    position: absolute;
    height: 50px;
    width: 50px;
    right: 0;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    outline: none;
    ${({ MagnifyingGlass }) =>
        css`
        background: burlywood url(${MagnifyingGlass}) no-repeat;
        background-size: 50%;
        background-position: 50%;
    `}
`;

export default Button;