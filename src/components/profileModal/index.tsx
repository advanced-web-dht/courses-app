import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import XIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import { toast } from 'react-toastify';

// import { CustomModal, StyledModal, FormFooter, FormContent } from './style';
import { StyledModal, FormHeader, FormAction, Form } from '../addClassModal/style';
import useInput from '../../hooks/useInput';
import { getProfile, updateProfie } from '../../api/client/auth';

interface FormProps {
  isOpenForm: boolean;
  close: () => void;
}

const ProfileModal: React.FC<FormProps> = ({ isOpenForm, close }) => {
  const [name, nameError, onChangeName, onNameError, , setName] = useInput();
  const [id, idError, onChangeId, , , setId] = useInput();
  const [canEditId, setCanEditId] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getProfile();
      setName(data.name);
      if (data.studentId) {
        setId(data.studentId);
        setCanEditId(false);
      }
    })();
  }, [isOpenForm]);

  const handleSubmit = async () => {
    if (name.trim().length > 5) {
      const result = await updateProfie(name, id);
      if (!result.message) {
        close();
        toast.success('Cập nhật thông tin thành công');
      } else {
        toast.error(result.message);
      }
    } else {
      onNameError('Họ tên it nhất 5 ký tự');
    }
  };

  return (
    <>
      <StyledModal open={isOpenForm} onClose={() => close()}>
        <Zoom in={isOpenForm}>
          <Form>
            <FormHeader>
              <div>Quản lý tài khoản</div>
              <IconButton onClick={() => close()}>
                <XIcon />
              </IconButton>
            </FormHeader>
            <FormAction>
              <TextField
                variant='outlined'
                label='Tên'
                placeholder='Nhập tên'
                color='primary'
                value={name}
                onChange={onChangeName}
                error={nameError.status}
                helperText={nameError.message}
                margin='normal'
              />
              <TextField
                variant='outlined'
                label='Mã số sinh viên'
                placeholder='Nhập mã số sinh viên'
                color='primary'
                value={id}
                onChange={onChangeId}
                error={idError.status}
                helperText={idError.message}
                margin='normal'
                disabled={!canEditId}
              />
              <Button variant='contained' size='large' type='button' onClick={handleSubmit}>
                Cập nhật
              </Button>
            </FormAction>
          </Form>
        </Zoom>
      </StyledModal>
    </>
  );
};

export default ProfileModal;
