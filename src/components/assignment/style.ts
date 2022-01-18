import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';

import RoundedButton from '../UI/RoundedButton';

export const AddAssignmentButton = styled(RoundedButton)`
  padding: 15px 25px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
`;

export const Form = styled(Box)`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  border: #fff;
`;

export const FormAction = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.8rem 2rem 2rem 2rem;

  .MuiInputBase-input {
    font-size: 17px;
    font-weight: 500;
    color: #3e4b4b;
  }

  .MuiButton-contained {
    margin-top: 10px;
    width: 50%;
    align-self: center;
  }

  .MuiFormLabel-root {
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
`;

export const FormHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-bottom: 1px solid #edf2f1;

  div {
    flex: 1;
    font-weight: bold;
    text-rendering: optimizeLegibility;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-size: 20px;
  }
`;

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DatePickerModal = styled(DatePicker)`
  display: flex;
  font-size: 17px;
  border-radius: 4px;
  box-shadow: inset 0 2px 2px #e9e9e9;
  border: 1px solid #aeaeae;
  line-height: 16px;
  padding: 16.5px 14px;
  margin-top: 25px;
  width: 100%;
  box-sizing: border-box;

  ::placeholder {
    color: black;
    opacity: 1;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`;

export const AssignmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin: 5px 0;
  padding: 15px;
  border-radius: 10px;
  :hover {
    box-shadow: 0 1px 2px 1px rgb(62 75 75 / 40%);
    cursor: pointer;
    .MuiSvgIcon-root {
      fill: #38b4fc;
    }
  }
`;

export const AssignmentItemTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

export const AssignmentItemAction = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
    font-weight: 500;
    font-size: 12px;
  }
`;
