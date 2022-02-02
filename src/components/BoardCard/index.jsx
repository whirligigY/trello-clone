import { useState } from "react";
import IMG from "./abstract1.jpeg";
import { Card } from "react-bootstrap";
import styles from "./BoardCard.module.css";
//import Modal from '../Modal';

const BoardCard = ({
  columnId,
  card,
  dragStartCardHandler,
  dragOverCardHandler,
  dragEndCardHandler,
  dropCardHandler,
}) => {
  function closeHandle() {
    setVisible(false);
  }

  function openHandle() {
    setVisible(true);
  }
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {/* <Modal visible={visible} closeHandle={closeHandle} /> */}
      {Number(card.columnId) === columnId && (
        <Card
          style={{ width: "19rem" }}
          className={styles.card}
          onClick={openHandle}
          draggable={true}
          onDragStart={(e) => {
            dragStartCardHandler(e, card.title, columnId);
          }}
          onDragLeave={dragEndCardHandler}
          onDragEnd={dragEndCardHandler}
          onDragOver={dragOverCardHandler}
          onDrop={(e) => {
            dropCardHandler(e, card.title, columnId);
          }}
        >
          <div className={styles.bd_clipboard}>
            <i
              className={"bi bi-pencil btn-secondary " + styles.btn_clipboard}
            ></i>
          </div>
          <Card.Img variant="top" src={IMG} draggable={false} />
          <Card.Body>
            <Card.Text draggable={false}>{card.title}</Card.Text>
            <Card.Link
              href="#"
              className="p-1 btn btn-secondary"
              draggable={false}
            >
              <i className="bi bi-clock-fill"></i>
              <span className={styles.ml}>23 jan</span>
            </Card.Link>
            <Card.Link
              href="#"
              className={"card-link " + styles.descrip}
              draggable={false}
            >
              <i className="bi bi-justify-left btn-light"></i>
            </Card.Link>
            <Card.Link href="#" draggable={false}>
              <i className="bi bi-link-45deg btn-light"></i>
            </Card.Link>
            <Card.Link href="#" draggable={false}>
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
