// FilterInput.tsx
import React from 'react';
import {StyledFilterInput} from './styles'; // adjust the import path as needed

interface FilterInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({value, onChange, placeholder}) => {
  return (
    <StyledFilterInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
  );
};

export default FilterInput;
