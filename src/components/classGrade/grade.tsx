import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import TextField from '@mui/material/TextField';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { toast } from 'react-toastify';

import useInput from '../../hooks/useInput';
import { IPointPart } from '../../type';
import { UpdatePointPart } from '../../api/client';
import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { GradeContainer, GradeForm, GradeActions, ActionButton } from './style';
import { updateGrade } from './action';

interface GradeProps {
  grade: IPointPart;
  index: number;
  classId: number;
}

const Grade: React.FC<GradeProps> = ({ grade, index, classId }) => {
  const [name, , onNameChange] = useInput(grade.name);
  const [ratio, ratioError, onRatioChange, onRatioError] = useInput(grade.ratio.toString());
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ratioNumber = parseInt(ratio, 10);
    if (ratioNumber < 1 || ratioNumber > 100) {
      onRatioError('Tỉ lệ điểm không hợp lệ');
      return;
    }

    const ratioNum = parseInt(ratio, 10);
    const result = await UpdatePointPart(classId, ratioNum, name, grade.id);
    const targetGrade = { ...grade, ratio: ratioNum, name };

    if (result) {
      toast.success('Cập nhật thành công');
      dispatch(updateGrade(targetGrade));
      setIsDisabled(true);
    } else {
      toast.error('Cập nhật không thành công');
    }
  };

  return (
    <Draggable draggableId={`${grade.id}`} index={index}>
      {(provided) => (
        <GradeContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onSubmit={handleSubmit}>
          <GradeForm>
            <TextField value={name} variant='standard' label='Cột điểm' disabled={isDisabled} onChange={onNameChange} />
            <TextField
              value={ratio}
              variant='standard'
              label='Tỉ lệ'
              type='number'
              disabled={isDisabled}
              onChange={onRatioChange}
              error={ratioError.status}
              helperText={ratioError.message}
              placeholder='Lớn hơn 0 và không quá 100'
            />
          </GradeForm>
          <GradeActions>
            <ActionButton
              variant='contained'
              color='primary'
              todo='edit'
              onClick={() => setIsDisabled(!isDisabled)}
              aria-label='edit grade'
            >
              <FontAwesomeSvgIcon icon={faPencilAlt} size='small' />
            </ActionButton>
            {isDisabled ? (
              <ActionButton variant='contained' color='error' todo='delete' aria-label='edit grade'>
                <FontAwesomeSvgIcon icon={faTrash} size='small' />
              </ActionButton>
            ) : (
              <ActionButton variant='contained' color='success' todo='save' type='submit' aria-label='edit grade'>
                <FontAwesomeSvgIcon icon={faSave} size='small' />
              </ActionButton>
            )}
          </GradeActions>
        </GradeContainer>
      )}
    </Draggable>
  );
};

export default Grade;
