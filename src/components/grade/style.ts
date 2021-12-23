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
    width: auto;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
    height: 50px;
  }

  th {
    background-color: #ddd;
    height: 60px;
  }
`;
