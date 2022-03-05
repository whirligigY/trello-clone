import { Label } from '../../types'

export interface LabelsDropdownProps {
  activeLabels: Array<Label>;
  changeActiveLabels: (newItem: Label) => void;
  labels: Array<Label>;
  changeLabels: (newItem: Label) => void;
  remove: (index: number) => void;
}

export interface AddLabelMenuProps extends LabelsDropdownProps {
  id: number;
  title: string;
  itemColor: string;
  itemStatus: boolean;
}