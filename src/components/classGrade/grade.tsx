import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

import useInput from '../../hooks/useInput';
import { GradeContainer, GradeForm, GradeActions, ActionButton } from './style';
import { IPointPart } from '../../type';

interface GradeProps {
	grade: IPointPart;
	index: number;
}

const Grade: React.FC<GradeProps> = ({ grade, index }) => {
	const [name, , onNameChange] = useInput(grade.name);
	const [ratio, ratioError, onRatioChange, onRatioError] = useInput(grade.ratio.toString());
	const [isDisabled, setIsDisabled] = useState(true);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const ratioNumber = parseInt(ratio, 10);
		if (ratioNumber < 1 || ratioNumber > 100) {
			onRatioError('Tỉ lệ điểm không hợp lệ');
		}
	};

	return (
		<Draggable draggableId={`${grade.id}`} index={index}>
			{(provided) => (
				<GradeContainer
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					onSubmit={handleSubmit}
				>
					<GradeForm>
						<TextField
							value={name}
							variant='standard'
							label='Cột điểm'
							disabled={isDisabled}
							onChange={onNameChange}
						/>
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
						>
							<FontAwesomeIcon icon={faPencilAlt} />
						</ActionButton>
						{isDisabled ? (
							<ActionButton variant='contained' color='error' todo='delete'>
								<FontAwesomeIcon icon={faTrash} />
							</ActionButton>
						) : (
							<ActionButton variant='contained' color='success' todo='save' type='submit'>
								<FontAwesomeIcon icon={faSave} />
							</ActionButton>
						)}
					</GradeActions>
				</GradeContainer>
			)}
		</Draggable>
	);
};

export default Grade;
