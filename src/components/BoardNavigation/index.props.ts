export interface useInputProps {
  value: string;
  onChange: (ev: Event) => void;
  onClear: () => void;
}

export interface BoardNavigationProps {
  title: string;
  inputSearch: (initial: string) => useInputProps;
}
