import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: 'flex',
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const Title = styled.h1`
    font-size: 2em;
    font-weight: bold;
    color: #333;
`;

export const NavigationHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    outline: 0;
    border: none;
    background-color: #f0f0f0;
    border-radius: 50%;
    &:hover {
        background-color: #e2e2e2;
    }
`;
