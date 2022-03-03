interface TaskModal {
  dateValue: Date | Array<Date>;
  changeDeadline: (arg: Date) => void;
  setDeadlineView: (arg: boolean) => void;
  useDeadlineRange: boolean;
  setDeadlineRange: (arg: boolean) => void;
  deadlineTime: string;
  changeDeadlineTime: (arg: string) => void;
  showDeadline: boolean;
  setSaveDeadline: (arg: boolean) => void;
  activeLabels: Array<Label>;
  changeActiveLabels: () => void;
  labels: Array<Label>;
  changeLabels: () => void;
  changeCheckList: (name: string) => void;
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
  colorCover: string;
  pictureCover: string;
  addColorCover: () => void;
  addPictureCover: (pictureCover: string) => void;
  removeCover: () => void;
}

export interface Label {
  id: number;
  value: string;
  status: boolean;
  color: string;
}

export interface CheckList {
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
  remove: (index: number) => void;
  taskDescription: string;
  setTaskDescription: (value: string) => void;
}

export interface TaskModalProps extends TaskModal {
  visible: boolean;
  closeHandle: () => void;
  title: string;
  column: string;
  removeLabel: (index: number) => void;
}