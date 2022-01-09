import React from 'react';
import styled from '@emotion/styled';
import Modal, { ModalProps } from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  padding-top: 20px;
`;

const FullSizeModal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Container>{children}</Container>
    </Modal>
  );
};

export default FullSizeModal;
