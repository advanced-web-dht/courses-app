import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Button } from '@material-ui/core';
import XIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CustomModal, StyledModal, FormFooter, buttonTheme } from './style';
import FormContent from './contentForm';
import { FormHeader } from '../../../addClassModal/style';

interface FormProps {
	isOpenForm: boolean;
	close: () => void;
}

const NewClass: React.FC<FormProps> = ({ isOpenForm, close }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<StyledModal open={isOpenForm} onClose={() => close()}>
				<CustomModal>
					<FormHeader>
						<div>Quản lý tài khoản</div>
						<IconButton onClick={() => close()}>
							<XIcon />
						</IconButton>
					</FormHeader>
					<FormContent />
					<FormFooter>
						<div>
							<MuiThemeProvider theme={buttonTheme}>
								<Button
									className='save-button'
									variant='contained'
									color='primary'
									startIcon={<SaveIcon />}
								>
									Lưu
								</Button>
								<Button
									className='cancel-button'
									variant='contained'
									color='secondary'
									startIcon={<CancelIcon />}
									onClick={handleClickOpen}
								>
									Hủy
								</Button>
							</MuiThemeProvider>
						</div>
					</FormFooter>
				</CustomModal>
			</StyledModal>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Xác nhận hủy</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Những thay đổi của bạn sẽ không được lưu lại.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<MuiThemeProvider theme={buttonTheme}>
						<Button className='save-button' variant='contained' color='primary' startIcon={<SaveIcon />}>
							Hủy
						</Button>
						<Button
							className='cancel-button'
							variant='contained'
							color='secondary'
							startIcon={<CancelIcon />}
						>
							Đóng
						</Button>
					</MuiThemeProvider>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NewClass;
