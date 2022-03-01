import { Checkbox } from '../types';

export interface CheckListProps {
  key: number;
  id: number;
  title: string;
  addCheckBox: (id: number) => void;
  changeCheckboxTitle: () => void;
  removeCheckBox: (id: number, listId: number) => void;
  changeProgress: (arg: HTMLElement) => void;
  removeCheckList: () => void;
  removeCheckListItem: () => void;
  checkboxes: Array<Checkbox>;
  checkedCheckboxes: Array<Checkbox>;
}