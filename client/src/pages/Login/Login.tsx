import Button from "../../components/Button"
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import * as utils from '../../utils/index'
import styles from '../../Layouts/LoginRegisterLayout/loginregister.module.css';
import { useAppDispatch } from "../../store/hook";
import { loginUser } from "../../store/features/userSlice";

const validationSchema = yup.object().shape({
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: yup.string().min(2, 'Parola en az 8 karakter olmalıdır').max(20, 'Parola en fazla 20 karakter olmalıdır').required('Parola zorunludur'),
});

function Login() {

  const dispatch = useAppDispatch();
  //const { serverError } = useAppSelector(state => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema,
    onSubmit: async (values, helpers) => {
      const res = await dispatch(loginUser(values));
      if (res.payload.error) {
        helpers.setFieldError(res.payload.path, res.payload.msg);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.isSubmitting && 'Giriş Yapılıyor...'}
      <label htmlFor="email">Email</label>
      <input
        placeholder="Enter your mail"
        type="email"
        id="email"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}
      <label htmlFor="password">Password</label>
      <input
        placeholder="Enter your password"
        type="password"
        id="password"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}
      <Button disabled={utils.isEmpty(formik.errors) ? false : true} type="submit" color="var(--default-blue)">Log In</Button>
      <span>Don't have an account? <Link to='register'>Sign Up</Link></span>
    </form>
  )
}

export default Login