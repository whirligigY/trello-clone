import React, { useEffect, useState } from "react";
import styles from './DashboardPage.module.css';

// TODO: Объект задачи отдельная сущность, массив с досками отдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок
// TODO: Колонка это отдельный компонент который должен сделать фетч всех задач и отрендерить в себе только те которые привязаны к ней
const DashboardPage = () => {
  const [columns, setColumns] = useState([]);

  const fetchColumns = async () => {
    try {
      const response = await fetch('http://localhost:3000/boardList.json');
      const data = await response.json();
      setColumns(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchColumns();
  }, []);

  const handler = (e) => {
    console.log(e);
  }

  return (
    <div className={styles.listContainer}>
        {columns.map((board) => (
          <div
            key={board.id}
            className={styles.container}
            draggable
            onDragStart={handler}
            onDragLeave={handler}
            onDragEnd={handler}
            onDragOver={handler}
            onDrop={handler}
          >
            <h4>{board.title}</h4>
          </div>
        ))}
    </div>
  );
};

export { DashboardPage };
