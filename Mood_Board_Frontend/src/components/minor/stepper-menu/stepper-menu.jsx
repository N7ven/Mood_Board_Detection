import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './stepper-menu.module.scss';

const StepperMenu = ({
  children, menuList, onClick, activeStep
}) => {
  const [t] = useTranslation();
  return (
    <section className={`${styles.product_cont} ${styles.side_stepper}`}>
      <div className={styles.stepper}>
        <ul>
          {
            menuList !== undefined && menuList?.length !== 0 && menuList.map((menu, i) => (
              <li>
                <a
                  href="#"
                  key={menu}
                  onClick={() => onClick(i)}
                  className={(activeStep === i) && styles.active}
                >
                  {t(`stepper.${menu.replaceAll(' ', '').toLowerCase()}`)}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};

export default StepperMenu;
