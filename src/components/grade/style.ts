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
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .MuiTableContainer-root {
    max-height: 700px;
    overflow-y: auto;
    ::-webkit-scrollbar-thumb {
      background-color: #818b99;
      border: 3px solid transparent;
      border-radius: 9px;
      background-clip: content-box;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
  }

  .MuiTable-root {
    align-self: center;
  }

  > div {
    margin-top: 10px;
  }

  .MuiTableCell-root {
    font-weight: bold;
    font-size: 13pt;
    span {
      display: flex;
      align-items: center;

      svg {
        margin-left: 5px;
      }
    }
  }

  .MuiTableHead-root .MuiTableCell-root {
    background-color: #202020;
    color: #f4f6f6;
    font-weight: bold;
    font-size: 13pt;
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
    margin: 10px 0;
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
