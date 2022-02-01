import { useState } from "react";
import IMG from "./abstract1.jpeg";
import { Card } from "react-bootstrap";
import styles from "./BoardCard.module.css";
import { TaskModalWindow } from '../TaskModal/TaskModal';

const BoardCard = ({ columnId, card }) => {
  function closeHandle() {
    setVisible(false);
  }

  function openHandle() {
    setVisible(true);
  }

  const [visible, setVisible] = useState(false);

  return (
    <div>
      {<TaskModalWindow 
      visible={visible} 
      closeHandle={closeHandle} 
      title={card.title}
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
            <Card.Link href="#" className="p-1 btn btn-secondary">
              <i className="bi bi-clock-fill"></i>
              <span className={styles.ml}>23 jan</span>
            </Card.Link>
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
