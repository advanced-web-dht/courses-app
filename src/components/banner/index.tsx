import React from 'react';
import { Typography } from '@mui/material';
import { FullBanner, CustomBanner, TitleBanner } from './style';
import StyledContainer from '../UI/Container';

const Banner = () => {
	return (
		<StyledContainer>
			<FullBanner>
				<CustomBanner>
					<TitleBanner>
						<h1>[CQ] PTUDWNC - 18_3</h1>
						<Typography>PTUDWNC</Typography>
					</TitleBanner>
				</CustomBanner>
			</FullBanner>
		</StyledContainer>
	);
};

export default Banner;
