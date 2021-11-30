import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import PlusIcon from '@mui/icons-material/AddCircleOutlined';
import Fade from '@mui/material/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import useInput from '../../hooks/useInput';
import { GradeContainer, GradeForm, GradeActions, ActionButton, ActivateMask } from './style';

const AddGrade: React.FC = () => {
	const [name, , onNameChange] = useInput();
	const [ratio, ratioError, onRatioChange, onRatioError] = useInput();
	const [isEdit, setIsEdit] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const ratioNumber = parseInt(ratio, 10);
		if (ratioNumber < 1 || ratioNumber > 100) {
			onRatioError('Tỉ lệ điểm không hợp lệ');
		}
	};

	return (
		<GradeContainer onSubmit={handleSubmit}>
			{isEdit ? (
				<Fade in={isEdit}>
					<React.Fragment>
						<GradeForm>
							<TextField value={name} variant='standard' label='Cột điểm' onChange={onNameChange} />
							<TextField
								value={ratio}
								variant='standard'
								label='Tỉ lệ'
								type='number'
								onChange={onRatioChange}
								error={ratioError.status}
								helperText={ratioError.message}
								placeholder='Lớn hơn 0 và không quá 100'
							/>
						</GradeForm>
						<GradeActions>
							<ActionButton
								variant='contained'
								color='error'
								todo='cancel'
								type='button'
								onClick={() => setIsEdit(false)}
							>
								<FontAwesomeIcon icon={faTimes} />
							</ActionButton>
							<ActionButton variant='contained' color='success' todo='save' type='submit'>
								<FontAwesomeIcon icon={faSave} />
							</ActionButton>
						</GradeActions>
					</React.Fragment>
				</Fade>
			) : (
				<Fade in={!isEdit}>
					<ActivateMask onClick={() => setIsEdit(true)}>
						<PlusIcon fontSize='large' />
						<div>Thêm cột điểm mới</div>
					</ActivateMask>
				</Fade>
			)}
		</GradeContainer>
	);
};

export default AddGrade;
