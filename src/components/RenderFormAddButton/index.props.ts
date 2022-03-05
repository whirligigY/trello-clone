export interface RenderProps {
  value: string;
  onChange: (ev: React.MouseEvent<HTMLSpanElement> | undefined) => void;
  onClear: () => void;
}

export interface RenderFormAddButtonProps {
  placeholder: string;
  input: {
    value: string;
    onChange: (
      ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
    ) => void;
    onClear: () => void;
  };
  textBtn: string;
  onChangeState: (value: boolean) => void;
  handleAddActivity: (text: string) => void;
}
