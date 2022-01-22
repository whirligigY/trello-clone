import { useState } from 'react';

export function useCheckLists () {
  const [checkLists, setCheckList] = useState([]);
  return { checkLists, setCheckList } ;
}