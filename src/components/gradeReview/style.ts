import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export const Point = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin: 10px 0;
  padding: 0 10px;
`;

export const ReviewContainer = styled.div`
  padding: 10px 5px;
  & div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;

    .MuiTypography-h6 {
      font-weight: bold;
    }

    .MuiTypography-subtitle1 {
      float: right;
      display: flex;
      justify-content: flex-end;
    }

    .MuiTypography-body1 {
    }
  }
`;

export const AddReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextArea = styled(TextareaAutosize)`
  min-height: 200px !important;
  max-height: 600px !important;
  max-width: 636px !important;
  min-width: 636px;
  padding: 10px !important;
  font-size: 14pt;
  font-weight: 350;
`;

export const ManagementHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

export const ManagementList = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
`;

export const ReviewItem = styled(Button)`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin: 5px 0;
  padding: 15px;
  border-radius: 10px;
  color: inherit;
  text-transform: inherit;
  :hover {
    box-shadow: 0 1px 2px 1px rgb(62 75 75 / 40%);
    cursor: pointer;
    svg {
      fill: #38b4fc;
    }
    color: #38b4fc;
    background-color: #fff;
  }
`;

export const ReviewItemTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
