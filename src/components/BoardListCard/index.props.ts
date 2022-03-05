import { CardType } from '../../pages/DashboardPage/index.props';
import { ArrVisibleProps } from '../../pages/DashboardPage/index.props';

export interface BoardListCardProps {
  columnOrder: number;
  title: string;
  cards: CardType[];
  AddTask: (text: string, idColumn: number) => void;
  index: number;
  updateColumnTitle: (val: string, idColumn: number) => void;

  columnId: number;
  updateCardTitle: (val: string, cardId: number) => void;
  handleCardDelete: (
    cardId: number,
    columnId: number,
    cardOrder: number
  ) => void;
  cardsVisible: ArrVisibleProps[] | [];
  getData: (type: string, id: number | null) => void;

  handleColumnDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    columnId: number,
    colOrder: number
  ) => void;
  boardId: number;
}
