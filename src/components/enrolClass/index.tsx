import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { StyledContainer, Routes } from './style';
import RoundedButton from '../UI/RoundedButton';
import { IClass } from '../../type';
import { EnrollClass as EnrollClassAPI } from '../../api/client';

interface EnrollClassProps {
	classData: IClass;
	isAuth: boolean;
}

const EnrollClass: React.FC<EnrollClassProps> = ({ isAuth, classData }) => {
	const router = useRouter();

	const handleEnroll = async () => {
		const result = await EnrollClassAPI(classData.id);
		const redirectUrl = `/class/${classData.code}`;
		if (result) {
			toast.success('Bạn đã tham gia thành công', { onClose: () => router.push(redirectUrl) });
		} else {
			toast.warning('Bạn đã tham gia lớp này rồi', { onClose: () => router.push(redirectUrl) });
		}
	};

	return (
		<StyledContainer>
			<h1>Enrol Class</h1>
			{isAuth ? (
				<Routes>
					<RoundedButton variant='contained' color='success' onClick={handleEnroll}>
						Tham gia
					</RoundedButton>
				</Routes>
			) : (
				<Routes>
					<Link href='/signin?redirect=/enrol' passHref>
						<RoundedButton variant='contained'>Đăng nhập</RoundedButton>
					</Link>
					<Link href='/signup?redirect=/enrol' passHref>
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
