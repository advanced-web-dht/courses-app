import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';

import { AppState } from '../../reducers';
import useToggle from '../../hooks/useToggle';

const Downloader: React.FC = () => {
  const { isOpen, handleClose, handleOpen } = useToggle();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { info, students } = useSelector((state: AppState) => state.currentClass);

  const studentDownload = useMemo(() => students.map((member) => ({ studentId: member.studentId, name: member.name })), [students]);

  return (
    <React.Fragment>
      <IconButton ref={buttonRef} onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={isOpen} anchorEl={buttonRef?.current} onClose={handleClose}>
        <CSVDownloader data={studentDownload} filename={`${info.name} - Học viên}`}>
          <MenuItem sx={{ color: 'initial' }} onClick={handleClose}>
            <DownloadIcon />
            Dowload
          </MenuItem>
        </CSVDownloader>
      </Menu>
    </React.Fragment>
  );
};

export default Downloader;
