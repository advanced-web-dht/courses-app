import styled from '@emotion/styled';

export const FullBanner = styled.div`
  height: 15rem;
  position: relative;
  width: 100%;
  max-width: 62.5rem;
  margin: auto;
`;

export const CustomBanner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  img {
    object-fit: cover;
  }
`;

export const TitleBanner = styled.div`
  z-index: 100;
  color: #fff;
  .MuiTypography-h4 {
    font-size: 2.25rem;
    font-weight: 500;
    line-height: 2.75rem;
  }
`;

export const ClassInfo = styled.div`
  display: flex;
  margin-top: 15px;
`;

export const Information = styled.div`
  width: 49%;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 10px;
`;
