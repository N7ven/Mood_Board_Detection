import React from 'react'
import styles from './cameras.module.scss'
import { Field, Form, Formik } from 'formik';

const AddCamera = () => {
  return (
    <div className={styles.addCameraForm}>
        <h4>Add Camera</h4>
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
                    <label htmlFor="firstName">Camera Name</label>
                    <Field id="firstName" name="firstName" placeholder="Camera Name" />
                </div>
                <div className={styles.fieldCont}>
                    <label htmlFor="lastName">RTSP Url</label>
                    <Field id="lastName" name="lastName" placeholder="URL" />
                </div>

                <div className={styles.btnCont}>
                    <button type="submit">Submit</button>
                </div>
            </Form>
        </Formik>
    </div>
  )
}

export default AddCamera