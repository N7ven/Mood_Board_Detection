import * as React from 'react';
import Card from '@mui/material/Card';
import styles from './simple-card.module.scss';

export default function SimpleCard({
  pageTitle,
  children
}) {
  return (
    <div className={styles.bankManage}>
      <h6>{pageTitle}</h6>
      <Card className={styles.card}>
        {
          children
        }
      </Card>
    </div>
  );
}
