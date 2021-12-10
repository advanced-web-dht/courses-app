import { useState } from 'react';

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return { isOpen, handleClose, handleOpen };
};

export default useToggle;
