// styles.ts
import styled from 'styled-components';

export const StyledFilterInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 50%;
  box-sizing: border-box;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
  }

  &::placeholder {
    color: #888;
  }
`;

// Optionally, if you want to style the container of the input, you can create another styled component
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // Adjust the width as needed
`;
