import React, { useState } from 'react';
import { Popover, IconButton, Button, Paper } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import { Record } from '../types/recode.ts';

type Props = {
  record: Record;
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
};

const MoreOptions: React.FC<Props> = ({ record, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // 클릭하면 토글
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Paper
          sx={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
        >
          <Button
            onClick={() => {
              onEdit(record);
              handleClose();
            }}
            sx={{ textAlign: 'left', padding: '8px' }}
          >
            수정
          </Button>
          <Button
            onClick={() => {
              onDelete(record);
              handleClose();
            }}
            sx={{ textAlign: 'left', padding: '8px', color: 'red' }}
          >
            삭제
          </Button>
        </Paper>
      </Popover>
    </div>
  );
};

export default MoreOptions;
