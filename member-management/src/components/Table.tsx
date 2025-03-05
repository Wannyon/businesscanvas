import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { Add, FilterAlt, MoreVert } from '@mui/icons-material';

import { useRecordStore } from '../store/useRecordStore.ts';
import { fieldsMetadata, Record } from '../types/recode.ts';

import FilterDropdown from '../pages/FilterDropdown';

const Table = () => {
  const { records } = useRecordStore();
  const [selected, setSelected] = useState<number[]>([]); // 체크박스
  const [activeFilter, setActiveFilter] = useState<string | null>(null); // 선택된 필터링 항목
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({}); // 필터링 조건 배열

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selected.length === records.length) {
      // 모두 선택되어 있을 떄
      setSelected([]); // 모든 체크 해제
    } else {
      setSelected(records.map((record) => record.id));
    }
  };

  // 개별 체크박스 핸들러
  const handleSelect = (id: number) => {
    setSelected((check) =>
      check.includes(id) ? check.filter((item) => item !== id) : [...check, id],
    );
  };

  // 필터 드롭다운 열기
  const toggleFilter = (fieldKey: string) => {
    setActiveFilter(activeFilter === fieldKey ? null : fieldKey);
    console.log('filedKey:', fieldKey);
  };

  // 필터 적용
  const handleFilterChange = (fieldKey: string, selectedValues: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldKey]: [...selectedValues],
    }));
  };

  // 필터링된 데이터
  const filteredRecords = records.filter((record) => {
    return Object.keys(filters).every((key) => {
      const fieldKey = key as keyof Record; // 타입 명시;;
      if (!filters[fieldKey] || filters[fieldKey].length === 0) {
        return true;
      }

      // emailConsent 필드일 경우 true/flase을 '선택됨'/'선택 안함'로 변환
      const emailValue =
        fieldKey === 'emailConsent'
          ? record[fieldKey]
            ? '선택됨'
            : '선택 안함'
          : String(record[fieldKey]);

      return filters[fieldKey].includes(emailValue);
    });
  });

  useEffect(() => {
    console.log('filters 상태 업데이트:', filters);
    console.log('activeFilter:', activeFilter);
  }, [filters]);

  return (
    <TableContainer>
      <Header>
        <Title>회원 목록</Title>

        <StyledButton>
          <Add fontSize="small" /> 추가
        </StyledButton>
      </Header>
      <StyledTable>
        <TableHead>
          <tr>
            <th style={{ justifyItems: 'center' }}>
              <Checkbox
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selected.length === records.length && records.length > 0
                }
              />
            </th>
            {fieldsMetadata.map((field) => (
              <TableHeadCell
                key={field.key}
                onClick={() => toggleFilter(field.key)}
              >
                <TableHeadText>
                  {field.label}
                  <FilterIcon>
                    <FilterAlt sx={{ fontSize: 12, color: 'gray' }} />
                  </FilterIcon>
                  {activeFilter === field.key && (
                    <FilterDropdown
                      fieldKey={field.key}
                      options={[
                        ...new Set(
                          records.map((data) =>
                            field.key === 'emailConsent' // 이메일 수신 동의 필드 값 변환
                              ? data[field.key]
                                ? '선택됨'
                                : '선택 안함'
                              : String(data[field.key]),
                          ),
                        ),
                      ]} // 중복된 값 제거
                      selectedFilters={filters[field.key] || []}
                      onSelectFilter={(fieldKey, selectedValues) => {
                        console.log('fieldKey:', fieldKey);
                        console.log('selectedValue:', selectedValues);
                        handleFilterChange(fieldKey, selectedValues);
                      }}
                    />
                  )}
                </TableHeadText>
              </TableHeadCell>
            ))}
            <TableHeadCell />
          </tr>
        </TableHead>
        <TableBody>
          {filteredRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell
                style={{
                  justifyItems: 'center',
                  border: '1px solid #eee',
                  borderTop: '0',
                  padding: '0',
                  width: '32px',
                  height: '48px',
                }}
              >
                <Checkbox
                  type="checkbox"
                  onChange={() => handleSelect(record.id)} // 화살표 함수로 즉시 실행 방지(렌더링 시 실행 x)
                  checked={selected.includes(record.id)}
                />{' '}
              </TableCell>
              {fieldsMetadata.map((field) => (
                <TableCell key={field.key}>
                  {field.key === 'emailConsent' ? ( // 'emailConsent' 필드일 경우 체크박스 표시
                    <Checkbox
                      type="checkbox"
                      checked={record[field.key]}
                      disabled
                    />
                  ) : (
                    String(record[field.key])
                  )}
                </TableCell>
              ))}
              <TableCell>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;

// 테이블 전체 컨테이너
export const TableContainer = styled.div`
  width: 100%;
  height: 100vh;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 헤더 (버튼 포함) 컨테이너
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  //align-items: center;
  border-bottom: 1px solid #0000000f;
  padding: 8px 14px;
`;

// 헤더 글씨
export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
`;

// 추가 버튼
export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background: #4a7cfe;
  color: white;
  border: 1px solid #4a7cfe;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #739fff;
    border: 1px solid #739fff;
  }

  &:active {
    background: #345dd9;
    border: 1px solid #345dd9;
  }
`;

// 테이블
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// 테이블 헤더
const TableHead = styled.thead`
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
`;

// 테이블 헤더 셀
const TableHeadCell = styled.th`
  position: relative;
  white-space: nowrap;
  padding: 8px 0;

  &:hover {
    background-color: #00000005;
    transition: background-color 0.2s ease-in-out;
  }
`;

// 테이블 헤더 셀 텍스트
const TableHeadText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  height: 22px;
  padding: 0 8px;
  border-right: 0.5px solid #eee;
`;

// 테이블 바디
const TableBody = styled.tbody``;

const TableRow = styled.tr`
  height: 48px;
  border-bottom: 1px solid #eee;
`;

// 셀
const TableCell = styled.td`
  color: #333;
  padding: 8px;
  font-weight: 400;
  line-height: 31px;
`;

// 체크박스
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

// 정렬 아이콘
const FilterIcon = styled.span`
  margin-left: 4px;
  color: #ccc;
`;
