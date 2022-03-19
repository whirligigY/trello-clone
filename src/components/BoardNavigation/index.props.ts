export interface BoardNavigationProps {
  title: string;
  inputSearch: {
    value: string;
    onChange: (
      ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
    ) => void;
    onClear: () => void;
  };
}
