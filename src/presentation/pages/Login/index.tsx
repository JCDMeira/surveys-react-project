import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/Spinner/Spinner';
import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';
import Input from '@/presentation/components/Input';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="#" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" placeholder="Digite seu e-mail" />
        <Input type="password" placeholder="Digite sua senha" />

        <button type="submit" className={Styles.submit}>
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>erro</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
