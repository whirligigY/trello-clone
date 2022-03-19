import {
  CardType,
  ArrVisibleProps,
} from './../../pages/DashboardPage/index.props';

export interface BoardCardProps {
  card: CardType;
  columnTitle: string;
  cardId: number;
  cardIndex: number;
  columnId: number;
  updateCardTitle: (val: string, cardId: number) => void;
  handleCardDelete: (
    cardId: number,
    columnId: number,
    cardOrder: number
  ) => void;
  getData: (type: string, id: number | null) => void;
  cardsVisible: ArrVisibleProps[] | [];
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
  setLabelsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface Checkbox {
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