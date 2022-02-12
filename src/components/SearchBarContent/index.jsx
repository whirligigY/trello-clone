import { useState, useEffect } from 'react';

export function SearchContentDB(props) {
  const { title, description, dataId, date } = props;

  const [dateConverted, setDateConverted] = useState('');

  useEffect(() => {
    const dateNew = new Date(date);
    setDateConverted(
      `${dateNew.getFullYear()}-${dateNew.getMonth()}-${dateNew.getDay()}`
    );
  }, [props]);

  return (
    <div className="search__content__DB" key={dataId}>
      <h3>Board Name: {title}</h3>
      <p>Description: {description}</p>
      <p>Created at: {dateConverted}</p>
    </div>
  );
}
