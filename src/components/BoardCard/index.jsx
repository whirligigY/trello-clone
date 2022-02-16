import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { Draggable } from 'react-beautiful-dnd';

import styles from './BoardCard.module.css';
import { TaskModalWindow } from '../TaskModal/TaskModal';
import { RenderCardTitle } from '../RenderCardTitle';

import { CardLabel } from '../CardLabel';

const BoardCard = ({ columnId, card, columnTitle, cardId, cardIndex }) => {
  const [visible, setVisible] = useState(false);

  const [isEditTitleCard, setIsEditTitleCard] = useState(false);


  function closeHandle() {
    setVisible(false);
  }

  function openHandle() {
    setVisible(true);
  }

  const handleCardSave = () => {
    setIsEditTitleCard(false);
  };
  const handleCardClose = () => {
    setIsEditTitleCard(false);
  };
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
    { id: 4, value: '', status: false, color: 'green' },
  ]);

  const changeLabels = (val) => {
    if (!val.id) {
      /* eslint-disable */
      val.id = labels.length + 1;
    }
    if (Number(val.id) <= Number(labels.length)) {
      setLabels((prevState) =>
        prevState.map((item) => {
          if (Number(val.id) === Number(item.id)) {
            /* eslint-disable */
            item.id = val.id;
            /* eslint-disable */
            item.color = val.color;
            /* eslint-disable */
            item.status = val.status;
            /* eslint-disable */
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
      ...activeLabels.slice(value + 1),
    ]);
  };
  /* end of labels states */

  /* checklists states */
  const [checkLists, setCheckList] = useState([]);

  const changeCheckList = (value) => {
    setCheckList([...checkLists, value]);
  };
  /* end checklists state */

  return (
    <Draggable draggableId={`${cardId}`} index={cardIndex}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >

          {
            <TaskModalWindow
              visible={visible}
              closeHandle={closeHandle}
              title={card.crd_title}
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
              cardId={card.crd_id}
            />
          }
          {Number(card['crd_columnid']) === columnId && (

            <Card
              style={{ width: '19rem' }}
              className={styles.card}
              onClick={openHandle}
            >
              <div className={styles.bd_clipboard}>
                <i
                  className={`bi bi-pencil btn-secondary ${styles.btn_clipboard}`}
                />
              </div>

              <Card.Body>

                <div>
                  {isEditTitleCard ? (
                    <RenderCardTitle
                      title={card.crd_title}
                      handleCardSave={handleCardSave}
                      handleCardClose={handleCardClose}
                    />
                  ) : (
                    <Card.Text className="mb-3">{card['crd_title']}</Card.Text>
                  )}
                </div>


                {showDeadline && (
                  <Card.Link href="#" className="p-1 btn btn-secondary">
                    <i className="bi bi-clock-fill" />
                    <span className={styles.ml}>
                      {Array.isArray(value)
                        ? moment(value[1]).format('DD MMM')
                        : moment(value).format('DD MMM')}
                    </span>
                  </Card.Link>
                )}
                <Card.Link href="#" className={`card-link ${styles.descrip}`}>
                  <i className="bi bi-justify-left btn-light" />
                </Card.Link>
                <Card.Link href="#">
                  <i className="bi bi-link-45deg btn-light" />
                </Card.Link>
                <Card.Link href="#">
                  <i className="bi bi-check2-square btn-light" />
                  <span className={`btn-light ${styles.ml}`}>2/2</span>
                </Card.Link>
                {activeLabels.length > 0 && (
                  <div className={styles.card_labels}>
                    {activeLabels.map(
                      (item) => item.status && <CardLabel item={item} />
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </Draggable>
  );
};

export { BoardCard };

/*
{activeLabels.map((item, i) => {
                      if (item.status) {
                        return <CardLabel item={item} key={i} />;
                      }
                      return '';
                    })}
*/
