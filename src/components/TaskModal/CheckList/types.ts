import { Checkbox } from '../types';
import { CheckedCheckbox } from '../types';

export interface CheckListProps {
  id: number;
  title: string;
  addCheckBox: (id: number) => void;
  changeCheckboxTitle: (e:  React.ChangeEvent<HTMLInputElement>) => void;
  removeCheckBox: (id: number, listId: number) => void;
  changeProgress: (arg: HTMLElement) => void;
  removeCheckList: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeCheckListItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
  checkboxes: Array<Checkbox>;
  checkedCheckboxes: Array<CheckedCheckbox>;
}

export { Checkbox } from '../types';
export { CheckedCheckbox } from '../types';