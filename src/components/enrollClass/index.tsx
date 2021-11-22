import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

import { StyledContainer, Routes } from './style';
import RoundedButton from '../UI/RoundedButton';
import { IClass } from '../../type';
import { EnrollClass as EnrollClassAPI } from '../../api/client';
import useRedirect from '../../hooks/useRedirect';

interface EnrollClassProps {
	classData: IClass;
	isAuth: boolean;
}

const EnrollClass: React.FC<EnrollClassProps> = ({ isAuth, classData }) => {
	const redirect = useRedirect();

	const handleEnroll = async () => {
		const result = await EnrollClassAPI(classData.id);
		const redirectUrl = `/class/${classData.code}`;
		if (result) {
			toast.success('Bạn đã tham gia thành công', { onClose: () => redirect.doRedirect(redirectUrl) });
		} else {
			toast.warning('Bạn đã tham gia lớp này rồi', { onClose: () => redirect.doRedirect(redirectUrl) });
		}
	};

	return (
		<StyledContainer>
			<Typography variant='h4' textAlign='center'>
				Chào mừng bạn đến với lớp học
			</Typography>
			<Typography variant='h4' fontWeight='bold' textAlign='center'>
				{classData?.name}
			</Typography>
			<Typography>Giảng viên: {classData?.members[0].name}</Typography>
			{isAuth ? (
				<Routes>
					<RoundedButton variant='contained' color='success' onClick={handleEnroll}>
						Tham gia
					</RoundedButton>
				</Routes>
			) : (
				<Routes>
					<Link href={`/signin?redirect=/enroll/${classData?.code}`} passHref>
						<RoundedButton variant='contained'>Đăng nhập</RoundedButton>
					</Link>
					<Link href={`/signup?redirect=/enroll/${classData?.code}`} passHref>
						<RoundedButton variant='contained' color='error'>
							Đăng ký
						</RoundedButton>
					</Link>
				</Routes>
			)}
		</StyledContainer>
	);
};

export default EnrollClass;
