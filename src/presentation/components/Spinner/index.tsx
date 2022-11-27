import React from 'react';

import Styles from './spinner.styles.scss';

type Props = { className: string };

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div
      data-testid="spinner"
      className={[Styles.spinner, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
