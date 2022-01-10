import { styled as muiStyled } from '@mui/system';
import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';

export const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}));

export const Root = styled.div`
  margin-bottom: 10px;
  padding: 10px;

  table {
    font-family: arial, sans-serif;
    table-layout: auto;
    width: 100%;
  }

  td {
    border: 1px solid #ddd;
    height: 50px;
    padding-left: 10px;
  }

  td span {
    display: flex;
    align-items: center;
  }

  td span svg {
    margin-left: 5px;
  }

  td .MuiInput-root {
    width: 100%;
    padding: 0 20px;
  }

  td.student-id {
    text-align: center;
  }

  th {
    border: 1px solid #ddd;
    background-color: #ddd;
    height: 60px;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
`;

export const GradeAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
  flex-grow: 0;
  a {
    display: flex;
    align-items: center;
  }
  .MuiButton-root {
    width: 150px;
  }
`;

export const StudentGradeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .MuiTypography-root {
    font-weight: bold;
    text-align: center;
    width: 100%;
  }

  table {
    margin-top: 10px;
    width: 500px;
    text-align: center;
  }

  table th {
    border: 1.5px solid grey;
    background-color: silver;
  }

  table td {
    border: 1px solid grey;
  }
`;
