import { useState } from 'react';

const useToggleModal = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShow = (type: string): void =>
    type === 'filter' ? setShowFilter(true) : setShowMenu(true);

  const handleClose = (type: string): void => {
    type === 'filter' ? setShowFilter(false) : setShowMenu(false);
  };
  return { showFilter, showMenu, handleShow, handleClose };
};

export { useToggleModal };
