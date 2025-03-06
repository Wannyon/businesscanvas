import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';

import { fieldsMetadata, JobType, Record } from '../types/recode.ts';
import { useRecordStore } from '../store/useRecordStore.ts';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddRecordModal: React.FC<Props> = ({ open, onClose }) => {
  const { addRecord } = useRecordStore();
  const [formData, setFormData] = useState<Partial<Record>>({
    name: '',
    address: '',
    memo: '',
    joinedAt: '',
    job: '개발자',
    emailConsent: false,
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // 필수 입력 검사
    const requiredFields = fieldsMetadata
      .filter((field) => field.required)
      .map((field) => field.key);

    const isAllValid = requiredFields.every((key) => formData[key]);

    setIsValid(isAllValid);
  }, [formData]);

  const handleChange = (key: keyof Record, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!isValid) return;

    addRecord({
      id: Date.now(),
      ...formData,
      joinedAt: dayjs(formData.joinedAt).format('YYYY-MM-DD'),
    } as Record);

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ background: 'white' }}>
        <form>
          {fieldsMetadata.map((field) => (
            <div key={field.key}>
              <label>
                {field.label}{' '}
                {field.required && <span style={{ color: 'red' }}>*</span>}
              </label>
              {field.type === 'text' || field.type === 'textarea' ? (
                <TextField
                  variant="outlined"
                  size="small"
                  multiline={field.type === 'textarea'}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : field.type === 'date' ? (
                <div></div>
              ) : field.type === 'select' ? (
                <TextField
                  select
                  variant="outlined"
                  size="small"
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
                      checked={formData.emailConsent || false}
                      onChange={(e) =>
                        handleChange('emailConsent', e.target.checked)
                      }
                    />
                  }
                  label={field.label}
                />
              ) : null}
            </div>
          ))}
        </form>
        <div>
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
        </div>
      </div>
    </Modal>
  );
};

export default AddRecordModal;
