import { FloatingLabel, Form } from "react-bootstrap";
import styles from "./BoardTitleTextarea.module.css";
import { useInput } from "../../utils";

const BoardTitleTextarea = ({ title }) => {
  const { value, onChange, onClear } = useInput(title);

  const handleClear = (e) => {
    e.preventDefault();
  };
  return (
    <Form>
      <Form.Group className={"mb-3 " + styles.title} controlId="formBasicEmail">
        <Form.Label className={styles.label}>{value}</Form.Label>
        <Form.Control
          as="textarea"
          className={styles.textarea}
          onFocus={handleClear}
        />
      </Form.Group>
    </Form>
  );
};

export { BoardTitleTextarea };
