import React, { useState, useEffect, FC } from 'react';
import { Modal } from 'react-bootstrap';
import { TaskModalBody } from './TaskModalBody';
import { useAuth } from '../../contexts/Auth';
import './TaskModalWindow.css';

interface Props {
  visible: boolean;
  closeHandle: () => void;
  title: string;
  column: string;
  dateValue: string | Array<string>;
  changeDeadline: () => void;
  showDeadline: boolean;
  setDeadlineView: () => void;
  useDeadlineRange: boolean;
  setDeadlineRange: () => void;
  deadlineTime: string;
  changeDeadlineTime: () => void;
  activeLabels: Array<object>;
  changeActiveLabels: () => void;
  labels: Array<object>;
  changeLabels: () => void;
  removeLabel: () => void;
  changeCheckList: () => void;
  checkLists: Array<object>;
  cardId: number;
  addCheckBox: () => void;
  changeCheckboxTitle: () => void;
  removeCheckBox: () => void;
  changeProgress: () => void;
  removeCheckList: () => void;
  removeCheckListItem: () => void;
  checkboxes: Array<object>;
  checkedCheckboxes: Array<object>;
  setSaveDeadline: () => void;
  colorCover: string;
  pictureCover: string;
  addColorCover: () => void;
  addPictureCover: () => void;
  removeCover: () => void;
}
interface Data {
  0: DataNull;
}

interface DataNull {
  crd_description: string;
}

const TaskModalWindow: FC<Props> = ({
  visible,
  closeHandle,
  title,
  column,
  dateValue,
  changeDeadline,
  showDeadline,
  setDeadlineView,
  useDeadlineRange,
  setDeadlineRange,
  deadlineTime,
  changeDeadlineTime,
  activeLabels,
  changeActiveLabels,
  labels,
  changeLabels,
  removeLabel,
  changeCheckList,
  checkLists,
  cardId,
  addCheckBox,
  changeCheckboxTitle,
  removeCheckBox,
  changeProgress,
  removeCheckList,
  removeCheckListItem,
  checkboxes,
  checkedCheckboxes,
  setSaveDeadline,
  colorCover,
  pictureCover,
  addColorCover,
  addPictureCover,
  removeCover
}) => {
  const { user, client } = useAuth();

  const [taskDescription, setTaskDescription] = useState('');
  useEffect(() => {
    if (visible) {
      client
        .from('tsk_cards')
        .select('crd_description')
        .eq('crd_id', cardId)
        .then(({ data, error }) => {
          console.log(typeof data[0])
          if (!error) {
            if (data[0].crd_description) {
              setTaskDescription(data[0].crd_description);
            } else {
              setTaskDescription('')
            }
          }
        });
    }
  }, [visible]);

  return (
    <Modal
      show={visible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="task-modal-window"
    >
      <Modal.Header closeButton onClick={closeHandle}>
      { colorCover && 
                  <div className="modalcover cover__color" style={{backgroundColor: colorCover}}></div>}
                  {pictureCover && 
                  <div className="modalcover cover__pic">
                    <img src={`${pictureCover}`} alt="" />
                  </div>}
        <div className="header-content d-flex flex-column">
          <Modal.Title>{title}</Modal.Title>
          <p className="crd_column">
            in column{' '}
            <span className="link-secondary">
              {column}
            </span>
          </p>
        </div>
      </Modal.Header>
      <TaskModalBody
        dateValue={dateValue}
        changeDeadline={changeDeadline}
        showDeadline={showDeadline}
        setDeadlineView={setDeadlineView}
        useDeadlineRange={useDeadlineRange}
        setDeadlineRange={setDeadlineRange}
        deadlineTime={deadlineTime}
        changeDeadlineTime={changeDeadlineTime}
        activeLabels={activeLabels}
        changeActiveLabels={changeActiveLabels}
        labels={labels}
        changeLabels={changeLabels}
        remove={removeLabel}
        checkLists={checkLists}
        changeCheckList={changeCheckList}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        cardId={cardId}
        addCheckBox={addCheckBox}
        changeCheckboxTitle={changeCheckboxTitle}
        removeCheckBox={removeCheckBox}
        changeProgress={changeProgress}
        removeCheckList={removeCheckList}
        removeCheckListItem={removeCheckListItem}
        checkboxes={checkboxes}
        checkedCheckboxes={checkedCheckboxes}
        setSaveDeadline={setSaveDeadline}
        colorCover={colorCover}
        pictureCover={pictureCover}
        addColorCover={addColorCover}
        addPictureCover={addPictureCover}
        removeCover={removeCover}
      />
    </Modal>
  );
};

export { TaskModalWindow };
