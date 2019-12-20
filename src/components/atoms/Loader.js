import styled from 'styled-components';
import LoaderIcon from 'assets/icons/loader.svg';

const Loader = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background: url(${LoaderIcon}) no-repeat;
    background-size: 50%;
    background-position: 50%;
`;

export default Loader;