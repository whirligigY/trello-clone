import { useState } from "react";
import IMG from "./abstract1.jpeg";
import { Card } from "react-bootstrap";
import styles from "./BoardCard.module.css";
import { TaskModalWindow } from '../TaskModal/TaskModal';
import moment from 'moment';

const BoardCard = ({ columnId, card, columnTitile }) => {
  function closeHandle() {
    setVisible(false);
  }

  function openHandle() {
    setVisible(true);
  }

  const [visible, setVisible] = useState(false);

  /* deadline states */
  const [value, onChange] = useState(new Date());
  const [showDeadline, setShowDeadline] = useState(false)
  const [isActiveRange, setIsActiveRange] = useState(false);
  const [deadlineTime, setDeadlineTime] = useState('');
  const changeDeadlineView = (value) => {
    setShowDeadline(value);
  }
  const setDeadlineRange = (value) => {
    setIsActiveRange(value);
  }
  const changeDeadlineTime = (value) => {
    setDeadlineTime(value);
  }

  /* end of deadline states */

  return (
    <div>
      {<TaskModalWindow 
      visible={visible} 
      closeHandle={closeHandle} 
      title={card.title}
      column={columnTitile}
      dateValue={value}
      changeDeadline={onChange}
      showDeadline={showDeadline}
      setDeadlineView={changeDeadlineView}
      useDeadlineRange={isActiveRange}
      setDeadlineRange={setDeadlineRange}
      deadlineTime={deadlineTime}
      changeDeadlineTime={changeDeadlineTime}
      />}
      {Number(card.columnId) === columnId && (
        <Card
          style={{ width: "19rem" }}
          className={styles.card}
          onClick={openHandle}
        >
          <div className={styles.bd_clipboard}>
            <i
              className={"bi bi-pencil btn-secondary " + styles.btn_clipboard}
            ></i>
          </div>
          <Card.Img variant="top" src={IMG} />
          <Card.Body>
            <Card.Text>{card.title}</Card.Text>
            {showDeadline && <Card.Link href="#" className="p-1 btn btn-secondary">
              <i className="bi bi-clock-fill"></i>
              <span className={styles.ml}>
                {Array.isArray(value) ? moment(value[1]).format('DD MMM') : moment(value).format('DD MMM')}
              </span>
            </Card.Link>}
            <Card.Link href="#" className={"card-link " + styles.descrip}>
              <i className="bi bi-justify-left btn-light"></i>
            </Card.Link>
            <Card.Link href="#">
              <i className="bi bi-link-45deg btn-light"></i>
            </Card.Link>
            <Card.Link href="#">
              <i className="bi bi-check2-square btn-light"></i>
              <span className={"btn-light " + styles.ml}>2/2</span>
            </Card.Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export { BoardCard };
