import React from 'react';

import Styles from './styles.scss';

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type InputProps = {
  type: InputType;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <div className={Styles['input-wrap']}>
      <input type={type} name={type} placeholder={placeholder} />
      <span className={Styles.status}>🔴</span>
    </div>
  );
};

export default Input;
