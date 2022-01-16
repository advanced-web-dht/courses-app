import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const NotificationContainer = styled(Box)`
  padding: 5px 10px;
  width: 500px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .MuiTab-root {
    text-transform: none;
    font-weight: bold;
  }
`;

export const NotificationList = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #f4f6f6;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .MuiAccordion-root {
    background-color: #f4f6f6;
    border: none;
    box-shadow: none;
  }
`;
