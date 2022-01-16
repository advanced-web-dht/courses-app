import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { FullBanner, CustomBanner, TitleBanner, Information, ClassInfo } from './style';
import StyledContainer from '../UI/Container';

import banner from '../../../public/banner.jpg';
import { IPointPart } from '../../type';

interface BannerProps {
  title: string;
  owner?: string;
  grades: IPointPart[];
  students: number;
  teachers: number;
}

const Banner: React.FC<BannerProps> = ({ title, owner, students, teachers, grades }) => {
  return (
    <StyledContainer>
      <FullBanner>
        <CustomBanner>
          <Image src={banner} layout='fill' quality={100} priority alt='cover' />
          <TitleBanner>
            <Typography variant='h4' component='div'>
              {title}
            </Typography>
            <Typography variant='h6' component='div'>
              Giảng viên: {owner}
            </Typography>
          </TitleBanner>
        </CustomBanner>
        <ClassInfo>
          <Information>
            <Typography variant='h5' fontWeight='bolder' color='primary'>
              Thông tin lớp học
            </Typography>
            <ul aria-label='Class information'>
              <li>
                <Typography>Tổng số giảng viên: {teachers + 1}</Typography>
              </li>
              <li>
                <Typography>Tổng số học viên: {students}</Typography>
              </li>
            </ul>
          </Information>
          <Information>
            <Typography variant='h5' fontWeight='bolder' color='primary'>
              Thông tin cấu trúc điểm
            </Typography>
            <ul aria-label='Grade structure'>
              {grades.map((grade) => (
                <li key={grade.id}>
                  <Typography>
                    {grade.name} - Tỉ lệ: {grade.ratio}
                  </Typography>
                </li>
              ))}
            </ul>
          </Information>
        </ClassInfo>
      </FullBanner>
    </StyledContainer>
  );
};

Banner.defaultProps = {
  owner: ''
};

export default Banner;
