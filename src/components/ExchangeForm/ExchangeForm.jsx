import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { getExchangeInfo } from '../../redux/currency/ops';
const validation = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    query: '',
  };
  const handleSubmit = async (values, options) => {
    try {
      const isValid = validation.test(values.query);
      if (!isValid) {
        return console.log('Invalid request');
      }
      const [amount, from, , to] = values.query.split(' ');
      const request = { amount, from, to };
      await dispatch(getExchangeInfo(request)).unwrap();
      options.resetForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <button className={styles.button} type="submit">
          <RiExchangeDollarFill className={styles.icon} />
        </button>
        <Field
          name="query"
          title="Request format 15 USD in UAH"
          className={styles.input}
          placeholder="15 USD in UAH"
        />
      </Form>
    </Formik>
  );
};

export default ExchangeForm;
