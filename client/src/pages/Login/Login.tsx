import Button from "../../components/Button"
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, ErrorMessage, Field } from 'formik';
//import * as utils from '../../utils/index'
import styles from '../../Layouts/LoginRegisterLayout/loginregister.module.css';
import { useAppDispatch } from "../../store/hook";
import { loginUser } from "../../store/features/userSlice";

const validationSchema = yup.object().shape({
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: yup.string().min(2, 'Parola en az 8 karakter olmalıdır').max(20, 'Parola en fazla 20 karakter olmalıdır').required('Parola zorunludur'),
});

function Login() {

  const dispatch = useAppDispatch();
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: ''
      }} onSubmit={async (values, helpers) => {
        const res = await dispatch(loginUser(values));
        if (res.payload.error) {
          helpers.setFieldError(res.payload.path, res.payload.msg);
        }
      }}
    >
      {({ isSubmitting, isValid, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {isSubmitting && 'Giriş Yapılıyor...'}
          <label htmlFor="email">Email</label>
          <Field name='email' component='input' type='email' placeholder="Enter your mail" />
          <ErrorMessage className={styles.error} name="email" component='small' />
          <label htmlFor="password">Password</label>
          <Field name='password' component='input' type='password' placeholder="Enter your password" />
          <ErrorMessage className={styles.error} name="password" component='small' />
          <Button disabled={!isValid} type="submit" color="var(--default-blue)">Log In</Button>
          <span>Don't have an account? <Link to='register'>Sign Up</Link></span>
        </form>
      )}
    </Formik>
  )
}

export default Login