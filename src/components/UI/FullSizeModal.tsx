import React from 'react';
import styled from '@emotion/styled';
import Modal, { ModalProps } from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  padding-top: 20px;
`;

const StyledModal = styled(Modal)`
  overflow-y: auto;

  .MuiBackdrop-root {
    background-color: #fff;
  }
`;

const FullSizeModal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <Container>{children}</Container>
    </StyledModal>
  );
};

export default FullSizeModal;
