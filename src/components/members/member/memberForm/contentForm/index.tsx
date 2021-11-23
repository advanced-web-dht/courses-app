import React from 'react';
import TextField from '@mui/material/TextField';
import { Content } from './style';

const ContentForm: React.FC = () => {
	return (
		<Content>
			<div>
				{' '}
				<form className='content'>
					<TextField
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Họ và tên'
						color='primary'
						className='classname-input'
						value='Phạm Tấn'
					/>
					<TextField
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Mã số sinh viên'
						color='primary'
						className='classname-input'
						value='18120082'
					/>
					<TextField
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Email'
						color='primary'
						className='classname-input'
						value='seacaboqn@gmail.com'
					/>
					<TextField
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						label='Mật khẩu'
						color='primary'
						className='classname-input'
						value='phamtanxyz'
					/>
				</form>
			</div>
		</Content>
	);
};

export default ContentForm;
