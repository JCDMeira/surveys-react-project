import React, { useState, useEffect } from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  FormStatus,
  Footer,
  Input,
} from '@/presentation/components/';
import FormContext from '@/presentation/contexts/Form/form-context';
import { Validation } from '@/presentation/protocols/validation';

type LoginStateType = {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string;
  emailError: string;
  passwordError: string;
};

type LoginProps = {
  validation: Validation;
};

const Login: React.FC<LoginProps> = ({ validation }) => {
  const [loginState, setLoginState] = useState<LoginStateType>({
    email: '',
    password: '',
    isLoading: false,
    errorMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
  });

  useEffect(() => {
    validation.validate('email', loginState.email);
  }, [loginState.email]);

  useEffect(() => {
    validation.validate('password', loginState.password);
  }, [loginState.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ loginState, setLoginState }}>
        <form action="#" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            type="submit"
            className={Styles.submit}
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
