export interface DeadlineDropdownProps {
  dateValue: Date | Array<Date>;
  changeDeadline: (arg: Date) => void;
  setDeadlineView: (arg: boolean) => void;
  useDeadlineRange: boolean;
  setDeadlineRange: (arg: boolean) => void;
  deadlineTime: string;
  changeDeadlineTime: (arg: string) => void;
  setSaveDeadline: (arg: boolean) => void;
}