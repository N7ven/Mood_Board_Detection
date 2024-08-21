import React from 'react';
import Button from 'components/minor/button/button';
import { TYPE } from 'utils/common-constants';
import { VARIANT } from 'utils/variants-constants';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <div className={styles.wrapper}>
        <h1>404</h1>
        <span>Page Not Found</span>
        <Button
          type={TYPE.PRIMARY}
          variant={VARIANT.PLAIN}
          label="Go Back"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
