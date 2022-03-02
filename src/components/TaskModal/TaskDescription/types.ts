import { FormControlProps } from "react-bootstrap";
import { KeyboardEvent } from 'react';

export interface TaskDescriptionProps {
  cardId: number;
  taskDescription: string;
  setTaskDescription: (arg: string) => void;
}

export interface EditFormProps extends TaskDescriptionProps {
  setHeigth: (e: KeyboardEvent<HTMLInputElement>) => void;
}
