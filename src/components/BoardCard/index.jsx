import { useState } from 'react'
import IMG_1 from './abstract1.jpeg'
import IMG_2 from './abstract2.jpeg'
import IMG_3 from './abstract3.jpeg'
import { Card } from 'react-bootstrap'
import styles from './BoardCard.module.css'
import { TaskModalWindow } from '../TaskModal/TaskModal'

const BoardCard = ({
  columnId,
  card,
  columnTitle,
  dragStartCardHandler,
  dragOverCardHandler,
  dragEndCardHandler,
  dropCardHandler
}) => {
  const [visible, setVisible] = useState(false)
  console.log(card)
  function closeHandle() {
    setVisible(false)
  }

  function openHandle() {
    setVisible(true)
  }

  return (
    <div>
      {
        <TaskModalWindow
          visible={visible}
          closeHandle={closeHandle}
          title={card.title}
          column={columnTitle}
        />
      }
      {Number(card.crd_columnid) === columnId && (
        <Card
          style={{ width: '19rem' }}
          className={styles.card}
          onClick={openHandle}
          draggable={true}
          onDragStart={(e) => {
            dragStartCardHandler(e, card)
          }}
          onDragLeave={dragEndCardHandler}
          onDragEnd={dragEndCardHandler}
          onDragOver={dragOverCardHandler}
          onDrop={(e) => {
            dropCardHandler(e, card, columnId)
          }}
        >
          <div className={styles.bd_clipboard}>
            <i
              className={'bi bi-pencil btn-secondary ' + styles.btn_clipboard}
            ></i>
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
              className={'card-link ' + styles.descrip}
              draggable={false}
            >
              <i className="bi bi-justify-left btn-light"></i>
            </Card.Link>
            <Card.Link href="#" draggable={false}>
              <i className="bi bi-link-45deg btn-light"></i>
            </Card.Link>
            <Card.Link href="#" draggable={false}>
              <i className="bi bi-check2-square btn-light"></i>
              <span className={'btn-light ' + styles.ml}>2/2</span>
            </Card.Link>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export { BoardCard }
