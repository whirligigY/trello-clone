import React, { useState, useEffect, FC } from 'react';
import './searchContentCard.css';
import { IBoards } from './types';

export const SearchContentCard: FC<IBoards> = ({ data }) => {
  const [dateConverted, setDateConverted] = useState<string>('');

  useEffect(() => {
    const dateNew = new Date(data.insertedat).toLocaleString('ru-RU');
    setDateConverted(dateNew);
  }, [data]);

  return (
    <div className="search__content__DB" key={data.id}>
      <h3>Board Name: {data.title}</h3>
      <p>Description: {data.description}</p>
      <p>Created at: {dateConverted}</p>
    </div>
  );
};
