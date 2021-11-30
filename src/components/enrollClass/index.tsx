import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

import { StyledContainer, Routes } from './style';
import RoundedButton from '../UI/RoundedButton';
import { IClass } from '../../type';
import { EnrollClass as EnrollClassAPI, EnrollClassForTeacher } from '../../api/client';
import useRedirect from '../../hooks/useRedirect';

interface EnrollClassProps {
	classData: IClass;
	isAuth: boolean;
	token?: string;
}

const EnrollClass: React.FC<EnrollClassProps> = ({ isAuth, classData, token }) => {
	const redirect = useRedirect();

	const handleEnroll = async () => {
		let result;
		if (token) {
			result = await EnrollClassForTeacher(classData.id, token);
		} else {
			result = await EnrollClassAPI(classData.id);
		}
		const redirectUrl = `/class/${classData.code}`;
		if (result.isSuccess) {
			toast.success('Bạn đã tham gia thành công', { onClose: () => redirect.doRedirect(redirectUrl) });
		} else {
			toast.warning(result.message, { onClose: () => redirect.doRedirect(redirectUrl) });
		}
	};

	const redirectUrl = `/enroll/${classData?.code}${token && `?token=${token}`}`;

	return (
		<StyledContainer>
			<Typography variant='h4' textAlign='center'>
				Chào mừng bạn đến với lớp học
			</Typography>
			<Typography variant='h4' fontWeight='bold' textAlign='center'>
				{classData?.name}
			</Typography>
			<Typography>Giảng viên: {classData?.members[0]?.name}</Typography>
			{isAuth ? (
				<Routes>
					<RoundedButton variant='contained' color='success' onClick={handleEnroll}>
						Tham gia
					</RoundedButton>
				</Routes>
			) : (
				<Routes>
					<Link href={`/signin?redirect=${redirectUrl}`} passHref>
						<RoundedButton variant='contained'>Đăng nhập</RoundedButton>
					</Link>
					<Link href={`/signup?redirect=${redirectUrl}`} passHref>
						<RoundedButton variant='contained' color='error'>
							Đăng ký
						</RoundedButton>
					</Link>
				</Routes>
			)}
		</StyledContainer>
	);
};

EnrollClass.defaultProps = {
	token: ''
};

export default EnrollClass;
