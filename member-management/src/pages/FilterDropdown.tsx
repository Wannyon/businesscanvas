import { useEffect, useState } from 'react';

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
    <div>
      <div>
        {options.map((option) => (
          <label key={option} style={{ display: 'flex' }}>
            <input
              type="checkbox"
              checked={selectedFilter.includes(option)}
              onChange={() => {
                handleFilterChange(option);
              }}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
