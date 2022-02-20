import React, { useState, useEffect } from 'react';
import './searchContentCard.css';

export const SearchContentCard = (props) => {
  const { data } = props;

  const [dateConverted, setDateConverted] = useState('');

  useEffect(() => {
    const dateNew = new Date(data.date);
    setDateConverted(
      `${dateNew.getFullYear()}-${dateNew.getMonth()}-${dateNew.getDay()}`
    );
  }, [data.date, props]);

  return (
    <div className="search__content__DB" key={data.id}>
      <h3>Board Name: {data.title}</h3>
      <p>Description: {data.description}</p>
      <p>Created at: {dateConverted}</p>
    </div>
  );
};
