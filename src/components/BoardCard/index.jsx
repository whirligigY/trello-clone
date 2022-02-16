import { useState } from "react";
import IMG_1 from "./abstract1.jpeg";
import IMG_2 from "./abstract2.jpeg";
import IMG_3 from "./abstract3.jpeg";
import { Card } from "react-bootstrap";
import styles from "./BoardCard.module.css";
import { TaskModalWindow } from '../TaskModal/TaskModal';
import { CardLabel } from '../CardLabel';
import moment from 'moment';
import { useEffect } from "react";
import { useAuth } from "../../contexts/Auth";


const BoardCard = ({
  columnId,
  card,
  columnTitle,
  dragStartCardHandler,
  dragOverCardHandler,
  dragEndCardHandler,
  dropCardHandler,
}) => {
  const { user, client} = useAuth();
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

  /* labels states */
  const [activeLabels, setActiveLabels] = useState([]);
  const [labels, setLabels] = useState([{id: 1, value: 'a', status: false, color: 'blue'}, {id: 2, value: '', status: false, color: 'red'}, {id: 3, value: '', status: false, color: 'yellow'}, {id: 4, value: '', status: false, color: 'green'}]);

  const changeLabels = (value) => {
    if (!value.id) 
      value.id = labels.length + 1;
    if (Number(value.id) <= Number(labels.length)) {
      setLabels((prevState) => {
        return prevState.map((item) => {
          if (Number(value.id) === Number(item.id)) {
            item.id = value.id;
            item.color = value.color;
            item.status = value.status
            item.value = value.value;
          }
          return item;
        });
      });
    } else {
      setLabels([...labels, value]);
    }
  }
  
  
  const changeActiveLabels = (value) => {
    let index = -1;
    activeLabels.map((item) => {
      if (Number(value.id) === Number(item.id))
      {
        index = activeLabels.indexOf(item)
      }
      return item;
    })
    if (index !== -1) {
    setActiveLabels((prevState) => {
        return prevState.map((item) => {
          if (Number(value.id) === Number(item.id)) {
            item.id = value.id;
            item.color = value.color;
            item.value = value.value;
          }
          return item;
        });
      });
    } else {
      setActiveLabels([...activeLabels, value]);
    }
  }

  const removeActiveLabel = (value) => {
    setActiveLabels([
      ...activeLabels.slice(0, value),
      ...activeLabels.slice(value + 1)
    ]);
  }
  /* end of labels states */

  /* checklists states */
  const [checkLists, setCheckList] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [changes, setChanges] = useState(false);

  const changeCheckList = (value) => {
    setCheckList([...checkLists, {title: value, id: checkLists.length + 1, card: card.id}])
  }

  const saveCheckLists= async () => {
    let savedCardLists = checkLists.filter((list) => list.card == card.id);
    if (savedCardLists.length === 0)
      {savedCardLists = []}
    const { data, error } = await client
    .from('tsk_checklists')
    .insert([
      { 'list_id': card.id, 'lists': JSON.stringify(savedCardLists), 'list_crd_id': card.id}
    ], { upsert: true })
  };

  const saveCheckboxes= async () => {
    let savedCardCheckboxes = checkboxes.filter((checkbox) => checkbox.card == card.id)
    if (checkboxes.length === 0)
      {savedCardCheckboxes = []}
    const { data, error } = await client
    .from('tsk_checklists')
    .update({ 'checkboxes': JSON.stringify(savedCardCheckboxes) })
    .eq('list_crd_id', card.id)
  };

  useEffect(() => {
    if(checkLists.length > 0) {
      saveCheckLists();
    }
  }, [checkLists.length])

  useEffect(() => {
    if (changes) {
      if(checkLists.length === 0) {
        saveCheckLists();
        saveCheckboxes();
      }
      setChanges(false);
    }
  }, [changes])

  useEffect(() => {
    if (checkboxes.length >= 1) {
      saveCheckboxes();
      }
  }, [checkboxes])

  useEffect(() => {
    client
      .from('tsk_checklists')
      .select('*')
      .eq('list_crd_id', card.id)
      .then(({ data, error }) => {
        if(data.length > 0) {
          if (!error) {
            setCheckList(() => (data[0].lists.length) ? JSON.parse(data[0].lists) : []);
            setCheckboxes(() => (data[0].checkboxes) ? JSON.parse(data[0].checkboxes) : []);
            setCheckedCheckboxes(() => (data[0].checkboxes) ? (JSON.parse(data[0].checkboxes)).map((item)=> {
              return item.status ? {id: item.id, listId: item.listId} : 0}).filter((item) => item !== 0) : []);
          }
        }
      })
  }, [])

  const addCheckBox = (listId) => {
    setCheckboxes((prevState)=>{
      return [...prevState, {title: '', id: prevState[prevState.length-1] ? prevState[prevState.length-1].id + 1 : 1, status: false, listId: listId, card: card.id }];
    });
  };

  const onChangeCheckboxTitle = (e) => {
    const id = e.target.closest('.subtask').id;
    const value = e.target.value;
    setCheckboxes((prevState)=>{
      return prevState.map((item) => {
        if (Number(id) === Number(item.id)) {
          item.title = value;
        }
        return item;
      });
    });
  }

  const changeProgress = (e) => {
    const id = Number(e.target.closest('.subtask').id);
    const listId = Number(e.target.closest('.check-list').dataset.num);
    const item = {id, listId};
    if (e.target.checked) {
      if (checkedCheckboxes.findIndex(x => x.id === id && x.listId === listId) === -1) {
        setCheckedCheckboxes((prevState)=>{
          return [...prevState, item]
        });
        setCheckboxes((prevState)=>{
          return prevState.map((item) => {
            if (Number(id) === Number(item.id)) {
              item.status = true;
            }
            return item;
          });
        });
      }
    } else {
      const index = checkedCheckboxes.findIndex(x => x.id === id && x.listId === listId);
      setCheckedCheckboxes((prevState)=>{
        if (index === prevState.length-1) {
          return [...prevState.slice(0, index)]
        } else if (index === 0) {
          return [...prevState.slice(index, prevState.length)]
        }else {
          return [
            ...prevState.slice(0, index),
            ...prevState.slice(index + 1)
          ]
        }
      });
      setCheckboxes((prevState)=>{
        return prevState.map((item) => {
          if (Number(id) === Number(item.id)) {
            item.status = false;
          }
          return item;
        });
      });
    }
  }

  const removeCheckList = (e) => {
    const id = e.target.closest('.check-list').dataset.num;
    const index = checkLists.findIndex(x => Number(x.card) == Number(card.id) && Number(x.id) == Number(id));
    setCheckList((prevState)=>{
      if (index === prevState.length-1) {
        return [...prevState.slice(0, index)]
      } else if (index === 0) {
        return [...prevState.slice(index, prevState.length)]
      }else {
        return [
          ...prevState.slice(0, index),
          ...prevState.slice(index + 1)
        ]
      }
    });
    setCheckboxes([...checkboxes.filter((item) => item.listId != id).filter((item) => item.card == card.id)]);
    setChanges(true);
  }

  const removeCheckListItem = (e) => {
    const id = e.target.closest('.subtask').id;
    const listId = e.target.closest('.check-list').dataset.num;
    const index = checkedCheckboxes.findIndex(x => x.listId == listId && x.id == id);
    if (index !== -1) {
      setCheckedCheckboxes([
        ...checkedCheckboxes.slice(0, index),
        ...checkedCheckboxes.slice(index + 1)
      ]);
    }
    removeCheckbox(id, listId);
  }

  const removeCheckbox = (id, listId) => {
    let index = 0;
    checkboxes.map((item) => {
      if (Number(item.id) === Number(id) && Number(item.listId) === Number(listId)) {
        index = checkboxes.indexOf(item);
      }
      return item;
    })
    setCheckboxes([
      ...checkboxes.slice(0, index),
      ...checkboxes.slice(index + 1)
    ]);
  };
  /* end checklists state */
  /*end task modal states*/

  return (
    <div>
      {<TaskModalWindow 
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
      cardId={card.id}

      addCheckBox={addCheckBox}
      changeCheckboxTitle={onChangeCheckboxTitle}
      removeCheckBox={removeCheckbox}
      changeProgress={changeProgress}
      removeCheckList={removeCheckList}
      removeCheckListItem={removeCheckListItem}
      checkboxes={checkboxes}
      checkedCheckboxes={checkedCheckboxes}
      />}
      {Number(card.columnId) === columnId && (
        <Card
          style={{ width: "19rem" }}
          className={styles.card}
          onClick={openHandle}
          draggable={true}
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
              className={"bi bi-pencil btn-secondary " + styles.btn_clipboard}
            ></i>
          </div>
          {card.id === 0 && (
            <Card.Img variant="top" src={IMG_1} draggable={false} />
          )}
          {card.id === 1 && (
            <Card.Img variant="top" src={IMG_3} draggable={false} />
          )}
          {card.id === 3 && (
            <Card.Img variant="top" src={IMG_2} draggable={false} />
          )}
          <Card.Body>
            <Card.Text draggable={false}>{card.title}</Card.Text>
            {showDeadline && <Card.Link
              href="#"
              className="p-1 btn btn-secondary"
              draggable={false}
              >
                <i className="bi bi-clock-fill"></i>
                <span className={styles.ml}>
                  {Array.isArray(value) ? moment(value[1]).format('DD MMM') : moment(value).format('DD MMM')}
                </span>
            </Card.Link>}
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
            {(checkboxes.length > 0) && <Card.Link href="#" draggable={false}>
              <i className="bi bi-check2-square btn-light"></i>
              <span className={"btn-light " + styles.ml}>{checkedCheckboxes.length}/{checkboxes.length}</span>
            </Card.Link>}
            {activeLabels.length > 0 && (
                <div className={styles.card_labels}>
                  { activeLabels.map((item, i) => {
                    if (item.status) {
                      return <CardLabel item={item} key={i}/>
                    }
                    return '';
                  }
                  )}
                </div>
              )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export { BoardCard };
