import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

import { StyledCard, CardContent, CardLabel, CardFooter } from './style';
import { IAccount, IStudent } from '../../../type';
import FontAwesomeSvgIcon from '../../UI/fontAweosomeIcon';
import Avatar from '../../../../public/avatar.svg';

interface ClassProps {
  member: IAccount | IStudent;
  type?: string;
}

const Member: React.FC<ClassProps> = ({ member, type }) => {
  return (
    <StyledCard background='#edf2f1'>
      <CardContent>
        <Image src={Avatar} width={98} height={98} alt={member.name} />
      </CardContent>
      <CardLabel>
        <Typography>{member.name}</Typography>
      </CardLabel>
      <CardFooter>
        {type === 'student' && <FontAwesomeSvgIcon icon={faCheckCircle} fill={(member as IStudent).account ? 'green' : 'grey'} />}
      </CardFooter>
    </StyledCard>
  );
};

Member.defaultProps = {
  type: 'teacher'
};

export default Member;
