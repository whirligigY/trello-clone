import React from 'react';
import { useClick } from '../../utils';
import { RenderFormAddButton } from '../RenderFormAddButton';
import { RenderAddButton } from '../RenderAddButton';
import { useInput } from '../../hooks/useInput';

const AddButton = ({ type, placeholder, textBtn, onClick }) => {
  const [formRef, isFormActive, setIsFormActive] = useClick(false);

  const handleAddActivity = (text) => {
    if (typeof onClick === 'function') {
      setIsFormActive(false);
      if (text) onClick(text);
    }
  };

  const input = useInput('');

  const onChangeState = (value) => {
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
