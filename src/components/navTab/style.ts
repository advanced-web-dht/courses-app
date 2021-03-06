import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const NavTab = styled(Box)`
  margin-bottom: -1rem;
  a {
    text-transform: capitalize;
  }
  span {
    height: 5px;
  }
  .MuiTabs-scroller {
    overflow-x: auto !important;
  }
`;

export default NavTab;
