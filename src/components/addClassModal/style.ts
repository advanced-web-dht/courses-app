import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface FormProps {
  width?: number;
}

export const Form = styled(Box)<FormProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width}px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  border: #fff;
`;

Form.defaultProps = {
  width: 400
};

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
`;

export const FormHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-bottom: 1px solid #edf2f1;
  justify-content: space-between;
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
