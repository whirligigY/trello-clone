interface TaskModal {
  dateValue: Date | Array<Date>;
  changeDeadline: React.Dispatch<React.SetStateAction<Date | Date[]>>;
  setDeadlineView: (val: boolean) => void;
  useDeadlineRange: boolean;
  setDeadlineRange: (val: boolean) => void;
  deadlineTime: string;
  changeDeadlineTime: (val: string) => void;
  showDeadline: boolean;
  setSaveDeadline: React.Dispatch<React.SetStateAction<boolean>>;
  activeLabels: Array<Label>;
  changeActiveLabels: (value: Label) => void;
  labels: Array<Label>;
  changeLabels: (val: Label) => void;
  changeCheckList: (name: string) => void;
  checkLists: Array<CheckList>;
  cardId: number;
  addCheckBox: (id: number) => void;
  changeCheckboxTitle: (e: Event) => void;
  removeCheckBox: (id: number, listId: number) => void;
  changeProgress: (arg: HTMLElement) => void;
  removeCheckList: (e: Event) => void;
  removeCheckListItem: (e: Event) => void;
  checkboxes: Array<Checkbox>;
  checkedCheckboxes: Array<CheckedCheckbox>;
  colorCover: string;
  pictureCover: string;
  addColorCover: (val: string) => void;
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
export interface CheckedCheckbox {
  id: number;
  listId: number;
}

export interface TaskModalBodyProps extends TaskModal {
  remove: (value: number) => void;
  taskDescription: string;
  setTaskDescription: (value: string) => void;
}

export interface TaskModalProps extends TaskModal {
  visible: boolean;
  closeHandle: () => void;
  title: string;
  column: string;
  removeLabel: (value: number) => void;
}

export interface Data {
  crd_description: string | null;
}