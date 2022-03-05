export interface BoardFilterModalProps {
  showFilter: boolean;
  handleClose: (type: string) => void;
  inputSearch: {
    value: string;
    onChange: (
      ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
    ) => void;
    onClear: () => void;
  };
}
