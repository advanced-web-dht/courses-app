import styled from '@emotion/styled';

export const CommentsContainer = styled.div`
  margin: 10px 5px;
`;

export const CommentList = styled.div`
  margin: 10px 5px 15px 5px;
`;

export const CommentListHeader = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }

  .MuiTypography-subtitle1 {
    font-size: 11pt;
  }
`;

export const CommentItemContainer = styled.div`
  display: flex;
  margin: 15px 5px;
  align-items: center;

  svg {
    margin-right: 20px;
    border: 1px solid grey;
    padding: 4px;
    border-radius: 50%;
  }
`;

export const AddCommentWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 10px;
  margin-top: 10px;
  position: sticky;

  .MuiOutlinedInput-root {
    border-radius: 20px;
    display: flex;
    overflow: auto;

    .MuiInputAdornment-root {
      align-self: flex-end;
      margin: 0 8px 11px 0;
    }
  }
`;
