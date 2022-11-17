import React, { useContext } from 'react';

import Styles from './styles.scss';
import FormContext from '@/presentation/contexts/Form/form-context';

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
  name: string;
};

const Input: React.FC<InputProps> = ({ type, placeholder, name }) => {
  const value = useContext(FormContext);
  const error = value[`${name}Error`];

  const getStatus = (): string => {
    return '🔴';
  };

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={Styles['input-wrap']}>
      <input type={type} name={type} placeholder={placeholder} />
      <span
        data-testid={`${name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
