import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import IMG_1 from './abstract1.jpeg';
import IMG_2 from './abstract2.jpeg';
import IMG_3 from './abstract3.jpeg';
import styles from './BoardCard.module.css';
import { TaskModalWindow } from '../TaskModal/TaskModal';

const BoardCard = ({
  columnId,
  card,
  columnTitle,
  dragStartCardHandler,
  dragOverCardHandler,
  dragEndCardHandler,
  dropCardHandler
}) => {
  const [visible, setVisible] = useState(false);

  function closeHandle() {
    setVisible(false);
  }

  function openHandle() {
    setVisible(true);
  }

  /* task modal window state */
  /* deadline states */
  const [value, onChange] = useState(new Date());
  const [showDeadline, setShowDeadline] = useState(false);
  const [isActiveRange, setIsActiveRange] = useState(false);
  const [deadlineTime, setDeadlineTime] = useState('');

  const changeDeadlineView = (val) => {
    setShowDeadline(val);
  };

  const setDeadlineRange = (val) => {
    setIsActiveRange(val);
  };

  const changeDeadlineTime = (val) => {
    setDeadlineTime(val);
  };

  /* end of deadline states */

  /* labels states */
  const [activeLabels, setActiveLabels] = useState([]);
  const [labels, setLabels] = useState([
    { id: 1, value: 'a', status: false, color: 'blue' },
    { id: 2, value: '', status: false, color: 'red' },
    { id: 3, value: '', status: false, color: 'yellow' },
    { id: 4, value: '', status: false, color: 'green' }
  ]);

  const changeLabels = (val) => {
    if (!val.id) val.id = labels.length + 1;
    if (Number(val.id) <= Number(labels.length)) {
      setLabels((prevState) =>
        prevState.map((item) => {
          if (Number(val.id) === Number(item.id)) {
            item.id = val.id;
            item.color = val.color;
            item.status = val.status;
            item.value = val.value;
          }
          return item;
        })
      );
    } else {
      setLabels([...labels, val]);
    }
  };

  const changeActiveLabels = (value) => {
    let index = -1;
    activeLabels.map((item) => {
      if (Number(value.id) === Number(item.id)) {
        index = activeLabels.indexOf(item);
      }

      return item;
    });
    if (index !== -1) {
      setActiveLabels((prevState) =>
        prevState.map((item) => {
          if (Number(value.id) === Number(item.id)) {
            item.id = value.id;
            item.color = value.color;
            item.value = value.value;
          }
          return item;
        })
      );
    } else {
      setActiveLabels([...activeLabels, value]);
    }
  };

  const removeActiveLabel = (value) => {
    setActiveLabels([
      ...activeLabels.slice(0, value),
      ...activeLabels.slice(value + 1)
    ]);
  };
  /* end of labels states */

  /* checklists states */
  const [checkLists, setCheckList] = useState([]);

  const changeCheckList = (value) => {
    setCheckList([...checkLists, value]);
  };
  /* end checklists state */

  /* end task modal states */

  return (
    <div>
      <TaskModalWindow
        visible={visible}
        closeHandle={closeHandle}
        title={card.title}
        column={columnTitle}
        dateValue={value}
        changeDeadline={onChange}
        showDeadline={showDeadline}
        setDeadlineView={changeDeadlineView}
        useDeadlineRange={isActiveRange}
        setDeadlineRange={setDeadlineRange}
        deadlineTime={deadlineTime}
        changeDeadlineTime={changeDeadlineTime}
        activeLabels={activeLabels}
        changeActiveLabels={changeActiveLabels}
        labels={labels}
        changeLabels={changeLabels}
        removeLabel={removeActiveLabel}
        checkLists={checkLists}
        changeCheckList={changeCheckList}
      />
      {Number(card.crd_columnid) === columnId && (
        <Card
          style={{ width: '19rem' }}
          className={styles.card}
          onClick={openHandle}
          draggable
          onDragStart={(e) => {
            dragStartCardHandler(e, card);
          }}
          onDragLeave={dragEndCardHandler}
          onDragEnd={dragEndCardHandler}
          onDragOver={dragOverCardHandler}
          onDrop={(e) => {
            dropCardHandler(e, card, columnId);
          }}
        >
          <div className={styles.bd_clipboard}>
            <i
              className={`bi bi-pencil btn-secondary ${styles.btn_clipboard}`}
            />
          </div>
          {card.crd_id === 0 && (
            <Card.Img variant="top" src={IMG_1} draggable={false} />
          )}
          {card.crd_id === 1 && (
            <Card.Img variant="top" src={IMG_3} draggable={false} />
          )}
          {card.crd_id === 3 && (
            <Card.Img variant="top" src={IMG_2} draggable={false} />
          )}
          <Card.Body>
            <Card.Text draggable={false}>{card.crd_title}</Card.Text>
            {showDeadline && (
              <Card.Link
                href="#"
                className="p-1 btn btn-secondary"
                draggable={false}
              >
                <i className="bi bi-clock-fill" />
                <span className={styles.ml}>
                  {Array.isArray(value)
                    ? moment(value[1]).format('DD MMM')
                    : moment(value).format('DD MMM')}
                </span>
              </Card.Link>
            )}
            <Card.Link
              href="#"
              className={`card-link ${styles.descrip}`}
              draggable={false}
            >
              <i className="bi bi-justify-left btn-light" />
            </Card.Link>
            <Card.Link href="#" draggable={false}>
              <i className="bi bi-link-45deg btn-light" />
            </Card.Link>
            <Card.Link href="#" draggable={false}>
              <i className="bi bi-check2-square btn-light" />
              <span className={`btn-light ${styles.ml}`}>2/2</span>
            </Card.Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export { BoardCard };
