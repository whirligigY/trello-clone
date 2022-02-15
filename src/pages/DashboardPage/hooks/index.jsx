import { useState } from 'react';

const useToggleModal = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShow = (type) =>
    type === 'filter' ? setShowFilter(true) : setShowMenu(true);

  const handleClose = (e, type) => {
    console.log('close', e.target);
    type === 'filter' ? setShowFilter(false) : setShowMenu(false);
  };
  return { showFilter, showMenu, handleShow, handleClose };
};

export { useToggleModal };
