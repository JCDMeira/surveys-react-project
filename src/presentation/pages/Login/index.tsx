import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/Spinner/Spinner';
import Logo from '@/presentation/components/Logo';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
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
      <footer className={Styles.footer} />
    </div>
  );
};

export default Login;
