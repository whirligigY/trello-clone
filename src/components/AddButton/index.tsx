import React, { FC, LegacyRef } from 'react';
import { useInput } from '../../hooks/useInput';
import { RenderFormAddButton } from '../RenderFormAddButton';
import { RenderAddButton } from '../RenderAddButton';
import { useClick } from './hooks/useClick';
import { AddButtonProps } from './index.props';

const AddButton: FC<AddButtonProps> = ({
  type,
  placeholder,
  textBtn,
  onClick,
}) => {
  const [formRef, isFormActive, setIsFormActive] = useClick(false) as [
    formRef: LegacyRef<HTMLDivElement>,
    isFormActive: boolean,
    setIsFormActive: any
  ];

  const handleAddActivity = (text: string) => {
    if (typeof onClick === 'function') {
      setIsFormActive(false);
      if (text) onClick(text);
    }
  };

  const input = useInput('');

  const onChangeState = (value: boolean): void => {
    setIsFormActive(value);
  };

  return (
    <div ref={formRef}>
      {isFormActive && (
        <RenderFormAddButton
          onChangeState={onChangeState}
          handleAddActivity={handleAddActivity}
          placeholder={placeholder}
          input={input}
          textBtn={textBtn}
        />
      )}
      {!isFormActive && (
        <RenderAddButton
          type={type}
          textBtn={textBtn}
          onChangeState={onChangeState}
        />
      )}
    </div>
  );
};

export { AddButton };
