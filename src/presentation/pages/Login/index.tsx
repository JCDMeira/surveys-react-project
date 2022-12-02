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
import { Authentication } from '@/domain/usecases';

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
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const [loginState, setLoginState] = useState<LoginStateType>({
    email: '',
    password: '',
    isLoading: false,
    errorMessage: '',
    emailError: '',
    passwordError: '',
  });

  useEffect(() => {
    setLoginState({
      ...loginState,
      emailError: validation.validate('email', loginState.email),
      passwordError: validation.validate('password', loginState.password),
    });
  }, [loginState.email, loginState.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (loginState.isLoading) return;
    setLoginState({ ...loginState, isLoading: true });
    await authentication.auth({
      email: loginState.email,
      password: loginState.password,
    });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ loginState, setLoginState }}>
        <form action="#" className={Styles.form} onSubmit={handleSubmit}>
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
            disabled={!!loginState.emailError || !!loginState.passwordError}
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
