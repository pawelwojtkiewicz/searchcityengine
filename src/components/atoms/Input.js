import styled, { css } from 'styled-components';

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  padding: 0 25px;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  outline: none;
  box-shadow: 0px 0px 44px -9px rgba(0,0,0,0.27);
  border-radius: 15px;
  color: #000000;
  border-radius: 15px;
  font-weight: 600;
  font-size: 16px;
  
  ${({ buttonError }) =>
  buttonError &&
  css`
    border: 2px solid red;
    &::placeholder{
      color: red;
    }
  `}
`;

export default Input;