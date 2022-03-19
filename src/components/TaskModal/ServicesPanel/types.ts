import { Label } from "../types"

export interface CurrentLabelsProps {
  activeLabels: Array<Label>;
  changeActiveLabels: (value: Label) => void;
  labels: Array<Label>;
  changeLabels: (val: Label) => void;
  remove: () => void;
}

export interface CurrentLabelProps extends CurrentLabelsProps {
  item: Label;
}

export interface CurrentDeadlineProps {
  dateValue: Date | Array<Date>;
  changeDeadline: React.Dispatch<React.SetStateAction<Date | Date[]>>;
  setDeadlineView: (val: boolean) => void;
  useDeadlineRange: boolean;
  setDeadlineRange: (val: boolean) => void;
  deadlineTime: string;
  changeDeadlineTime: (val: string) => void;
  setSaveDeadline: React.Dispatch<React.SetStateAction<boolean>>;
}