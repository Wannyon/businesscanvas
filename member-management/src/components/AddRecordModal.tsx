import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { fieldsMetadata, JobType, Record } from '../types/recode.ts';
import { useRecordStore } from '../store/useRecordStore.ts';

type Props = {
  open: boolean;
  onClose: () => void;
  initialData: Record | null;
  isEdit: boolean;
};

const AddRecordModal: React.FC<Props> = ({ open, onClose, initialData, isEdit }) => {
  const { addRecord, updateRecord } = useRecordStore();
  const [formData, setFormData] = useState<Partial<Record>>({
    name: '',
    address: '',
    memo: '',
    joinedAt: '',
    job: '개발자',
    emailConsent: false,
  });

  const [isValid, setIsValid] = useState(false);

  // initialData 변경될 때 formData 초기화
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        address: initialData.address || '',
        memo: initialData.memo || '',
        joinedAt: initialData.joinedAt || '',
        job: initialData.job || '개발자',
        emailConsent: initialData.emailConsent || false,
      });
    } else {
      // 추가 버튼을 눌렀을 때 빈 값으로 초기화
      setFormData({
        id: undefined,
        name: '',
        address: '',
        memo: '',
        joinedAt: '',
        job: '개발자',
        emailConsent: false,
      });
    }
  }, [initialData]);

  useEffect(() => {
    // 필수 입력 검사
    const requiredFields = fieldsMetadata
      .filter((field) => field.required)
      .map((field) => field.key);

    const isAllValid = requiredFields.every((key) => formData[key]);

    setIsValid(isAllValid);
  }, [formData]);

  const handleChange = <K extends keyof Record>(key: keyof Record, value: Record[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!isValid) return;

    const newRecord = {
      id: formData.id ?? Date.now(), // id가 없으면 생성
      name: formData.name,
      address: formData.address,
      memo: formData.memo,
      joinedAt: dayjs(formData.joinedAt).format('YYYY-MM-DD'),
      job: formData.job,
      emailConsent: formData.emailConsent,
    }

    if (isEdit) {
      console.log('formData:', formData.id);
      updateRecord(newRecord as Record);
    } else {
      console.log('formData:', formData);
      addRecord(newRecord as Record);
    }

    setFormData({
      id: undefined,
      name: '',
      address: '',
      memo: '',
      joinedAt: '',
      job: '개발자',
      emailConsent: false,
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Header>
          <h3>회원 추가</h3>
          <button onClick={onClose}>X</button>
        </Header>
        <StyledForm>
          {fieldsMetadata.map((field) => (
            <InputItem key={field.key}>
              <label>
                {field.label} {field.required && <span>*</span>}
              </label>
              {field.type === 'text' ? (
                <TextField
                  variant="outlined"
                  size="small"
                  maxRows={1}
                  value={formData[field.key] || ''}
                  placeholder={'Input'}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : field.type === 'textarea' ? (
                <TextField
                  variant="outlined"
                  size="small"
                  multiline={field.type === 'textarea'}
                  minRows={2}
                  maxRows={2}
                  value={formData[field.key] || ''}
                  placeholder={'Textarea'}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : field.type === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    value={formData.joinedAt ? dayjs(formData.joinedAt) : null}
                    onChange={(date) =>
                        handleChange('joinedAt', date ? date.format('YYYY-MM-DD') : '')
                    }
                    slotProps={{
                      popper: {
                        placement: 'bottom-start', // 입력 필드 아래로 정렬
                      },
                      textField: {
                        placeholder: 'Select date',
                        variant: 'outlined',
                        size: 'small',
                      },
                    }}
                  />
                </LocalizationProvider>
              ) : field.type === 'select' ? (
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  maxRows={1}
                  value={formData.job || '개발자'}
                  onChange={(e) =>
                    handleChange('job', e.target.value as JobType)
                  }
                >
                  {(['개발자', 'PO', '디자이너', '인턴'] as JobType[]).map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              ) : field.type === 'checkbox' ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      className={'checkbox'}
                      checked={formData.emailConsent || false}
                      onChange={(e) =>
                        handleChange('emailConsent', e.target.checked)
                      }
                    />
                  }
                  label={''}
                  labelPlacement="end"
                />
              ) : null}
            </InputItem>
          ))}
        </StyledForm>
        <StyledButtonContainer>
          <Button onClick={onClose} variant="outlined">
            취소
          </Button>
          <Button
            disabled={!isValid}
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            저장
          </Button>
        </StyledButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default AddRecordModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
  max-height: 700px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 10px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    font-weight: 600;
    margin: 0;
  }

  button {
    background-color: transparent;
    color: #00000073;
    border: none;

    &:hover {
      background-color: #00000005;
      transition: background-color 0.2s ease-in-out;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 24px 20px 24px;
  gap: 20px;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #00000073;
  }

  span {
    color: #ff4d4f;
  }

  .checkbox {
    color: #e3e3e3;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  gap: 10px;
`;
