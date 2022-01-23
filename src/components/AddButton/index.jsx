import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LIST, ADD_CARD } from "../../actions/constants";
import styles from './AddButton.module.css';

const AddButton = ({ text, type, listId = null }) => {
  const [condition, setCondition] = useState({ isFormActive: false });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.lists);

  const handleAddActivity = () => {
    const text = condition.text;
    if (type === "list" && text) {
      dispatch({ type: ADD_LIST, payload: { text } });
    }
    if (type === "card" && text) {
      console.log(listId, state);
      dispatch({ type: ADD_CARD, payload: { text, id: listId } });
    }
  };

  const onChange = (ev) => {
    onChangeCondition("text", ev.target.value);
  };

  const renderForm = (type) => {
    const placeholder =
      type === "list"
        ? "Введите заголовок списка"
        : "Введите заголовок для это карточки";

    const textFormButton = type === "list" ? "список" : "задачу";

    return (
      <form>
        <textarea
          className="form-control"
          id="form-control"
          rows="3"
          placeholder={placeholder}
          autoFocus
          onBlur={() => onChangeCondition("isFormActive", false)}
          value={condition.text}
          onChange={onChange}
          style={styles.textarea}
        />
        <div className="input-group d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            onMouseDown={handleAddActivity}
          >
            Добавить {textFormButton}
          </button>
          <i className="bi bi-x-lg" style={styles.cross} />
        </div>
      </form>
    );
  };

  const renderButton = (type, text) => {
    return (
      <div
        style={type === "list" ? styles.list : styles.card}
        onClick={() => onChangeCondition("isFormActive", true)}
      >
        <i className="bi bi-plus-lg" />
        <span className="p-2">Добавить {text}</span>
      </div>
    );
  };
  function onChangeCondition(field, value) {
    setCondition({ ...condition, [field]: value });
  }

  return (
    <div>
      {condition.isFormActive
        ? renderForm(type, text, styles)
        : renderButton(type, text)}
    </div>
  );
};

export { AddButton };
