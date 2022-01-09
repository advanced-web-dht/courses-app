import { styled } from '@mui/system';
import TableRow from '@mui/material/TableRow';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}));

export const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    table-layout: auto;
    width: 100%;
  }

  td {
    border: 1px solid #ddd;
    padding: 8px;
    height: 50px;
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
`;
