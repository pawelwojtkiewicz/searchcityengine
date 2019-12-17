import styled from 'styled-components';

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  outline: none;

  &.search{
    width: 300px;
    height: 50px;
    padding: 0 25px;
    box-shadow: 0px 0px 44px -9px rgba(0,0,0,0.27);
    border-radius: 15px;
    color: #000000;
    border-radius: 15px;
    font-weight: 600;
    font-size: 16px;v
  }
`;

export default Input;