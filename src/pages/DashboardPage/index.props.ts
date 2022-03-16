export interface ColumnType {
  col_id?: number;
  col_boardid?: number;
  col_title?: string;
  col_order: number;
}

export interface CardType {
  crd_id?: number;
  crd_columnid?: number;
  crd_title?: string;
  crd_description?: string;
  crd_labels?: string;
  crd_order?: number;
  checkboxes?: string;
  lists?: string;
  crd_startDate?: string;
  crd_deadlineDate?: string;
  crd_deadlineTime?: string;
  crd_coverPic?: string;
  crd_coverColor?: string;
}

export interface ResultProps {
  destination: {
    index: number;
    droppableId: string;
  };
  source: {
    index: number;
    droppableId: string;
  };
  type: string;
}

export interface boardTitleProps {
  title: string;
  username: string;
}

export interface ArrVisibleProps {
  crd_id: number;
  visible: boolean;
}

export interface ArrProps {
  crd_order?: number;
  col_order?: number;
}

export type sortCardsProps = {
  (someArg: string): CardType;
};
