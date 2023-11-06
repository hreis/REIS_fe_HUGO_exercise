import styled from 'styled-components';

export const Container = styled.div<{ hasNavigation: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background: white;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 10px;
    transition: transform 0.2s ease-in-out;
    
    &:hover {
        transform: translateY(-5px);
    }
`;
