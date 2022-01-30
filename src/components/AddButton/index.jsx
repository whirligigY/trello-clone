import { useState } from 'react';
import { useInput } from '../../utils';
import { RenderFormAddButton } from '../RenderFormAddButton';
import { RenderAddButton } from '../RenderAddButton';
import { useClick } from '../../utils';

const AddButton = ({
  text,
  type,
  listId = null,
  placeholder,
  textBtn,
  onClick,
}) => {
  const handleAddActivity = (text) => {
    if (typeof onClick === 'function') {
      setIsFormActive(false);
      onClick(text);
    }
  };

  const [formRef, isFormActive, setIsFormActive] = useClick(false);
  const input = useInput('');

  const onChangeState = (value) => {
    setIsFormActive(value);
  };

  return (
    <div ref={formRef}>
      {isFormActive ? (
        <RenderFormAddButton
          onChangeState={onChangeState}
          handleAddActivity={handleAddActivity}
          placeholder={placeholder}
          input={input}
          textBtn={textBtn}
        />
      ) : (
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
