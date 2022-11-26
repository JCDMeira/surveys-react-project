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
  const { loginState, setLoginState } = useContext(FormContext);
  const error = loginState[`${name}Error`];

  const handleChange = (event: React.SyntheticEvent<EventTarget>): void => {
    const { name, value } = event.target as HTMLButtonElement;
    setLoginState({ ...loginState, [name]: value });
  };

  const getStatus = (): string => {
    return error ? '🔴' : '🟢';
  };

  const getTitle = (): string => {
    return error || 'Tudo certo';
  };

  return (
    <div className={Styles['input-wrap']}>
      <input
        data-testid={name}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
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
