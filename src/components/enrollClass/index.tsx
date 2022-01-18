import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

import { StyledContainer, Routes } from './style';
import RoundedButton from '../UI/RoundedButton';
import { IClass } from '../../type';
import { EnrollClass as EnrollClassAPI, EnrollClassForTeacher } from '../../api/client';
import useRedirect from '../../hooks/useRedirect';
import useToggle from '../../hooks/useToggle';
import ProfileModal from '../profileModal';
import useRequest from '../../hooks/useRequest';

interface EnrollClassProps {
  classData: IClass;
  isAuth: boolean;
}

const EnrollClass: React.FC<EnrollClassProps> = ({ isAuth, classData }) => {
  const redirect = useRedirect();
  const router = useRouter();
  const { data: account, mutate } = useRequest<Record<string, string>>({
    url: '/accounts/profile'
  });

  const { isOpen, handleOpen, handleClose } = useToggle();
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    (async () => {
      if (!router.query.token) {
        if (account && !account.studentId) {
          toast.warning('Vui lòng cập nhật mã số sinh viên!', { onClose: handleOpen, autoClose: 1500 });
        } else if (account && account.studentId) {
          setDisableSubmit(false);
        }
      } else {
        setDisableSubmit(false);
      }
    })();
  }, [router.isReady, account?.studentId]);

  useEffect(() => {
    mutate();
  }, [isOpen]);

  const handleCloseProfileModal = () => {
    mutate();
    if (account && account.studentId) {
      setDisableSubmit(false);
    }
    handleClose();
  };

  const handleEnroll = async () => {
    let result;
    const { token } = router.query;
    if (token) {
      result = await EnrollClassForTeacher(classData.id, token as string);
    } else {
      result = await EnrollClassAPI(classData.id, account?.studentId as string);
    }
    const redirectUrl = `/class/${classData.code}`;
    if (result.isSuccess) {
      toast.success('Bạn đã tham gia thành công', { onClose: () => redirect.doRedirect(redirectUrl) });
    } else {
      toast.warning(result.message, { onClose: () => redirect.doRedirect('/class') });
    }
  };

  const redirectUrl = `/enroll/${classData?.code}${router.query.token ? `?token=${router.query.tokentoken}` : ''}`;

  return (
    <StyledContainer>
      <Typography variant='h4' textAlign='center'>
        Chào mừng bạn đến với lớp học
      </Typography>
      <Typography variant='h4' fontWeight='bold' textAlign='center'>
        {classData?.name}
      </Typography>
      <Typography>Giảng viên: {classData?.owner.name}</Typography>
      {isAuth ? (
        <Routes>
          <RoundedButton variant='contained' color='success' onClick={handleEnroll} disabled={disableSubmit}>
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
      <ProfileModal isOpenForm={isOpen} close={handleCloseProfileModal} />
    </StyledContainer>
  );
};

export default EnrollClass;
