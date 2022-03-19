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
  labels: any[];
  setLabels: any[];
  setLabelsUpdate: any[];
}
