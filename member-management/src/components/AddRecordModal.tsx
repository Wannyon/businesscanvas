import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';

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

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <form>
          {fieldsMetadata.map((field) => (
            <div key={field.key}>
              <label>
                {field.label}{' '}
                {field.required && <span style={{ color: 'red' }}>*</span>}
              </label>
              {field.type === 'text' || field.type === 'textarea' ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline={field.type === 'textarea'}
                  value={formData[field.key] || ''}
                />
              ) : field.type === 'date' ? (
                <div></div>
              ) : field.type === 'select' ? (
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.job || '개발자'}
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
                    <Checkbox checked={formData.emailConsent || false} />
                  }
                  label={field.label}
                />
              ) : null}
            </div>
          ))}
        </form>
        <div>
          <button>취소</button>
          <button>저장</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRecordModal;
