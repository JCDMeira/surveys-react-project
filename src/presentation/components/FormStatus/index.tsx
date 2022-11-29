import React, { useContext } from 'react';
import { Spinner } from '@/presentation/components/';
import FormContext from '@/presentation/contexts/Form/form-context';

import Styles from './styles.scss';

const FormStatus: React.FC = () => {
  const {
    loginState: { isLoading, erroMessage },
  } = useContext(FormContext);
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {erroMessage && <span className={Styles.error}>{erroMessage}</span>}
    </div>
  );
};

export default FormStatus;
