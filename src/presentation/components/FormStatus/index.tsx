import React from 'react';
import { Spinner } from '@/presentation/components/';

import Styles from './styles.scss';

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>erro</span>
    </div>
  );
};

export default FormStatus;
