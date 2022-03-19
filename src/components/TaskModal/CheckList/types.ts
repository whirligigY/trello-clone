import { Checkbox } from '../types';
import { CheckedCheckbox } from '../types';

export interface CheckListProps {
  id: number;
  title: string;
  addCheckBox: (id: number) => void;
  changeCheckboxTitle: (e: Event) => void;
  removeCheckBox: (id: number, listId: number) => void;
  changeProgress: (arg: HTMLElement) => void;
  removeCheckList: (e: Event) => void;
  removeCheckListItem: (e: Event) => void;
  checkboxes: Array<Checkbox>;
  checkedCheckboxes: Array<CheckedCheckbox>;
}

export { Checkbox } from '../types';