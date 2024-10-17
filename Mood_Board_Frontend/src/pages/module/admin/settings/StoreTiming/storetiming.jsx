import React from 'react';
import styles from './storetiming.module.scss'
import { Field, Form, Formik } from 'formik';

const StoreTiming = () => {
  return (
    <div className={styles.storeTime}>
      <h4>Store Timing</h4>

      <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            >
            <Form>
                <div className={styles.fieldCont}>
                    <label htmlFor="firstName">Store Open Time</label>
                    <Field id="firstName" name="storopen" placeholder="Camera Name" type="date"/>
                </div>
                <div className={styles.fieldCont}>
                    <label htmlFor="lastName">Store Close Time</label>
                    <Field id="lastName" name="storeclose" placeholder="URL" />
                </div>
                <div className={styles.fieldCont}>
                    <label htmlFor="firstName">Lunch Open Time</label>
                    <Field id="firstName" name="linchopen" placeholder="Camera Name" type="date"/>
                </div>
                <div className={styles.fieldCont}>
                    <label htmlFor="lastName">Lunch Close Time</label>
                    <Field id="lastName" name="lunchclose" placeholder="URL" />
                </div>

                <div className={styles.btnCont}>
                    <button type="submit">Submit</button>
                </div>
            </Form>
        </Formik>
    </div>
  )
}

export default StoreTiming