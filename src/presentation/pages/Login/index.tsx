import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/Spinner/Spinner';
import LoginHeader from '@/presentation/components/LoginHeader';
import Footer from '@/presentation/components/Footer';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="#" className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles['input-wrap']}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles['input-wrap']}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={Styles.status}>🔴</span>
        </div>
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
