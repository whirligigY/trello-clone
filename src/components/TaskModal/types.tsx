interface TaskModal {
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
  labels: Array<Label>;
  changeLabels: () => void;
  changeCheckList: () => void;
  checkLists: Array<CheckList>;
  cardId: number;
  addCheckBox: (id: number) => void;
  changeCheckboxTitle: () => void;
  removeCheckBox: (id: number, listId: number) => void;
  changeProgress: (arg: HTMLElement) => void;
  removeCheckList: () => void;
  removeCheckListItem: () => void;
  checkboxes: Array<Checkbox>;
  checkedCheckboxes: Array<Checkbox>;
  setSaveDeadline: () => void;
  colorCover: string;
  pictureCover: string;
  addColorCover: () => void;
  addPictureCover: () => void;
  removeCover: () => void;
}

interface Label {
  id: number;
  value: string;
  status: boolean;
  color: string;
}

interface CheckList {
  id: number;
  title: string;
  card: number
}

export interface Checkbox{
  id: number;
  title: string;
  status: boolean;
  listId: number;
  card: number
}


export interface TaskModalBodyProps extends TaskModal {
  remove: () => void;
  taskDescription: string;
  setTaskDescription: (value: string) => void;
}

export interface TaskModalProps extends TaskModal {
  visible: boolean;
  closeHandle: () => void;
  title: string;
  column: string;
  removeLabel: () => void;
}