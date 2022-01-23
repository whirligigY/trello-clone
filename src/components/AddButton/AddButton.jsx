import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LIST, ADD_CARD } from "../../actions/constants";

const AddButton = ({ text, type, listId = null }) => {
  const [condition, setCondition] = useState({ isFormActive: false });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.lists);

  const handleAddActivity = (ev) => {
    const text = condition.text;
    if (type === "list" && text) {
      dispatch({ type: ADD_LIST, payload: { text } });
    }
    if (type === "card" && text) {
      console.log(listId, state);
      dispatch({ type: ADD_CARD, payload: { text, id: listId } });
    }
    return;
  };
  const onChange = (ev) => {
    onChangeCondition("text", ev.target.value);
  };

  const renderForm = (type, text) => {
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
          style={style.textarea}
        ></textarea>
        <div className="input-group d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            onMouseDown={handleAddActivity}
          >
            Добавить {textFormButton}
          </button>
          <i className="bi bi-x-lg" style={style.cross}></i>
        </div>
      </form>
    );
  };

  const renderButton = (type, text) => {
    return (
      <div
        style={type === "list" ? style.list : style.card}
        onClick={() => onChangeCondition("isFormActive", true)}
      >
        <i className="bi bi-plus-lg"></i>
        <span className="p-2">Добавить {text}</span>
      </div>
    );
  };
  function onChangeCondition(field, value) {
    setCondition({ ...condition, [field]: value });
  }

  return (
    <>
      {condition.isFormActive
        ? renderForm(type, text, style)
        : renderButton(type, text)}
    </>
  );
};
const style = {
  list: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    padding: "15px",
    borderRadius: "3px",
    opacity: 0.5,
    cursor: "pointer",
    height: "fit-content",
  },
  card: {
    backgroundColor: "inherit",
    padding: "15px 0 0 0",
    opacity: 1,
    cursor: "pointer",
    marginBottom: "8px",
  },
  textarea: {
    resize: "none",
    outline: "none",
    width: "100%",
    border: "none",
    width: "100%",
  },
  cross: {
    marginLeft: "10px",
  },
};
export default AddButton;
