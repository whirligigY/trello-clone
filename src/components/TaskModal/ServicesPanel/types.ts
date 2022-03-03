import { Label } from "../types"

export interface CurrentLabelsProps {
  activeLabels: Array<Label>;
  changeActiveLabels: () => void;
  labels: Array<Label>;
  changeLabels: () => void;
  remove: () => void;
}

export interface CurrentLabelProps extends CurrentLabelsProps {
  item: Label;
}

export interface CurrentDeadlineProps {
  dateValue: Date | Array<Date>;
  changeDeadline: () => void;
  setDeadlineView: () => void;
  useDeadlineRange: boolean;
  setDeadlineRange: () => void;
  deadlineTime: string;
  changeDeadlineTime: () => void;
  setSaveDeadline: () => void;
}