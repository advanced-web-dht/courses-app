import React from 'react';
import { Typography } from '@mui/material';
import { FullBanner, CustomBanner, TitleBanner } from './style';
import StyledContainer from '../UI/Container';

interface BannerProps {
	title: string;
	code: string;
}

const Banner: React.FC<BannerProps> = ({ title, code }) => {
	return (
		<StyledContainer>
			<FullBanner>
				<CustomBanner>
					<TitleBanner>
						<h1>{title}</h1>
						<Typography color='white'>{code}</Typography>
					</TitleBanner>
				</CustomBanner>
			</FullBanner>
		</StyledContainer>
	);
};

export default Banner;
