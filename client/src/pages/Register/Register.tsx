import Button from "../../components/Button"
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage, replace } from 'formik';
import * as utils from '../../utils/index'
import styles from '../../Layouts/LoginRegisterLayout/loginregister.module.css';
import { useAppDispatch } from "../../store/hook";
import { createUser } from "../../store/features/userSlice";


const validationSchema = yup.object().shape({
  name: yup.string().required('İsim zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  phone: yup.string().test('phone', 'Geçerli bir telefon numarası girin', utils.validatePhoneNumber).required('Telefon numarası zorunludur'),
  password: yup.string().min(2, 'Parola en az 2 karakter olmalıdır').max(20, 'Parola en fazla 20 karakter olmalıdır').required('Parola zorunludur'),
});

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: '',
        email: '',
        phone: '',
        password: '',
      }}
      onSubmit={async (values, helpers) => {
        const res = await dispatch(createUser({ ...values, phone: Number(values.phone) }));
        if (res.payload.error) {
          helpers.setFieldError(res.payload.path, res.payload.msg);
        }
        else navigate('/', { replace: true });
      }}
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <form onSubmit={handleSubmit} action='/' method='post'>
          {isSubmitting && 'Kayıt olunuyor...'}
          <label htmlFor="name">Name</label>
          <Field id='name' name='name' component='input' placeholder="Enter your name" type="text" />
          <ErrorMessage name="name" component='small' className={styles.error} />
          <label htmlFor="email">Email</label>
          <Field id='email' name='email' component='input' placeholder="Enter your email" type="email" />
          <ErrorMessage name="email" component='small' className={styles.error} />
          <label htmlFor="phone">Phone Number</label>
          <Field id='phone' name='phone' component='input' placeholder="Enter your phone number" type="tel" />
          <ErrorMessage name="phone" component='small' className={styles.error} />
          <label htmlFor="password">Password</label>
          <Field id='password' name='password' component='input' placeholder="Enter your password" type="password" />
          <ErrorMessage name="password" component='small' className={styles.error} />
          <Button disabled={!isValid} type="submit" color='var(--default-blue)'>Sign In</Button>
          <span>Do you have an account? <Link to='/'>Log In</Link></span>
        </form>
      )}
    </Formik>
  )
}

export default Register