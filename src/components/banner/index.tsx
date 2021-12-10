import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { FullBanner, CustomBanner, TitleBanner } from './style';
import StyledContainer from '../UI/Container';

import banner from '../../../public/banner.jpg';

interface BannerProps {
  title: string;
  owner?: string;
}

const Banner: React.FC<BannerProps> = ({ title, owner }) => {
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
      </FullBanner>
    </StyledContainer>
  );
};

Banner.defaultProps = {
  owner: ''
};

export default Banner;
