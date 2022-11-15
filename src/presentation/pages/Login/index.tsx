import React, { useState } from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  FormStatus,
  Footer,
  Input,
} from '@/presentation/components/';
import FormContext from '@/presentation/contexts/Form/form-context';

type LoginStateType = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [loginState] = useState<LoginStateType>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={loginState}>
        <form action="#" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" placeholder="Digite seu e-mail" />
          <Input type="password" placeholder="Digite sua senha" />

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
