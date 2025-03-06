import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface FilterDropdownProps {
  fieldKey: string;
  options: string[];
  selectedFilters: string[];
  onSelectFilter: (fieldKey: string, selectedValues: string[]) => void;
}

const FilterDropdown = ({
  fieldKey,
  options,
  selectedFilters,
  onSelectFilter,
}: FilterDropdownProps) => {
  const [selectedFilter, setSelectedFilter] =
    useState<string[]>(selectedFilters);

  // 체크박스 활성화 시 필터 적용
  const handleFilterChange = (option: string) => {
    setSelectedFilter((prevSelected) => {
      // 현재 선택된 필터 값 배열
      const updatedFilters = prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option) // 값이 이미 있으면 제거
        : [...prevSelected, option]; // 값이 없으면 추가

      console.log('dropDown fieldKey:', fieldKey);
      console.log('dropDown updated filters', updatedFilters);

      // 필터 상태를 부모 컴포넌트로 전달
      onSelectFilter(fieldKey, updatedFilters);

      return updatedFilters;
    });
  };

  useEffect(() => {
    console.log('options:', options); // 선택지
    console.log('selectedFilter:', selectedFilter); // 필터링 된 레코드
  }, [options, selectedFilter]);

  return (
    <DropdownContainer>
      {options.map((option) => {
        const isSelected = selectedFilter.includes(option);
        const isDisabled = !option; // 빈 값이면 Disabled

        return (
          <OptionLabel
            key={option}
            $selected={isSelected}
            $disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                handleFilterChange(option);
              }
            }}
          >
            <Checkbox
              type="checkbox"
              checked={isSelected}
              disabled={isDisabled} // 비활성화 적용
              onChange={() => handleFilterChange(option)}
            />
            {option || 'Disabled'}
          </OptionLabel>
        );
      })}
    </DropdownContainer>
  );
};

export default FilterDropdown;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  background: white;
  box-shadow:
    0 -2px 4px rgba(0, 0, 0, 0.05),
    0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 10;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow:
      0 -2px 4px rgba(0, 0, 0, 0.05),
      0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const OptionLabel = styled.label<{ $selected: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 6px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background: ${({ $selected }) => ($selected ? '#F0F7FF' : 'transparent')};
  color: ${({ $disabled }) => ($disabled ? '#aaa' : '#333')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover {
    background: #eaeaea;
    transition: background 0.2s ease-in-out;
    border-radius: 6px;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  background: white;

  &:checked {
    background: #4a7cfe;
    border: 1px solid #4a7cfe;
    position: relative;
  }

  &:checked::after {
    content: '✔';
    color: white;
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
