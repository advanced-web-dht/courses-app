import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIcon from '@mui/icons-material/AssignmentRounded';
import IconButton from '@mui/material/IconButton';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { toast } from 'react-toastify';

import { AppState } from '../../reducers';
import useToggle from '../../hooks/useToggle';
import { DeleteAssignment } from '../../api/client';
import { AssignmentItem, AssignmentItemTitle, AssignmentItemAction } from './style';
import { IAssignment } from '../../type';
import EditAssignmentModal from './editAssignment';
import useRequest from '../../hooks/useRequest';

interface AssignmentProps {
  assignment: IAssignment;
}

const Assignment: React.FC<AssignmentProps> = ({ assignment }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, handleOpen, handleClose } = useToggle();
  const [isEdit, setIsEdit] = useState(false);
  const { info: currentClass } = useSelector((state: AppState) => state.currentClass);

  const fetchUrl = `/assignment/${currentClass.id}`;
  const { mutate, data: assignments, response } = useRequest<IAssignment[]>({ url: fetchUrl });

  const handleDeleteAssignment = useCallback(async () => {
    const result = await DeleteAssignment(currentClass.id, assignment.id);
    if (result) {
      // update swr cache
      const data = assignments?.filter((item) => item.id !== assignment.id);
      await mutate({ ...response, data: data as IAssignment[] }, false);

      toast.success('Xoá bài tập thành công');
    } else {
      toast.error('Xoá không thành công');
    }
  }, []);

  const date = useMemo(() => new Date(assignment.dateEnded), [assignment.dateEnded]);

  // update swr only
  const handleUpdateAssignment = useCallback(async (targetAssignment: IAssignment) => {
    const data = [...(assignments as IAssignment[])];
    const index = data.findIndex((item) => item.id === targetAssignment.id);
    data[index] = targetAssignment;
    await mutate({ ...response, data }, false);
  }, []);

  return (
    <AssignmentItem>
      <AssignmentItemTitle>
        <AssignmentIcon fontSize='large' />
        <span>{assignment.name}</span>
      </AssignmentItemTitle>
      <AssignmentItemAction>
        <span>
          Đến hạn {date.toLocaleDateString()} | {date.toLocaleTimeString()}
        </span>
        <IconButton ref={buttonRef} onClick={handleOpen} aria-label='assignment options'>
          <MoreVertRoundedIcon />
        </IconButton>
      </AssignmentItemAction>
      <Menu
        aria-labelledby='demo-positioned-button'
        anchorEl={buttonRef.current}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleDeleteAssignment}>Xoá</MenuItem>
        <MenuItem onClick={() => setIsEdit(true)}>Cập nhật</MenuItem>
      </Menu>
      {isEdit && (
        <EditAssignmentModal
          isOpen={isEdit}
          handleClose={() => {
            setIsEdit(false);
            handleClose();
          }}
          oldDeadline={new Date(assignment.dateEnded)}
          oldName={assignment.name}
          id={assignment.id}
          updateAssignmentContext={handleUpdateAssignment}
        />
      )}
    </AssignmentItem>
  );
};

export default Assignment;
