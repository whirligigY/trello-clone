import { useState } from 'react';

export function useLabels () {
  const [labels, setLabels] = useState([]);
  return { labels, setLabels } ;
}