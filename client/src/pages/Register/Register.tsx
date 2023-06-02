import Button from "../../components/Button"
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
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
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    }, validationSchema,
    onSubmit: async (values, helpers) => {
      const res = await dispatch(createUser({ ...values, phone: Number(values.phone) }));
      if (res.payload.error) {
        console.log(res.payload);
        helpers.setFieldError(res.payload.path, res.payload.msg);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        placeholder="Enter your name"
        type="text"
        id="name"
        name="name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
      <label htmlFor="email">Email</label>
      <input
        placeholder="Enter your email"
        type="email"
        id="email"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}
      <label htmlFor="phone">Phone Number</label>
      <input
        placeholder="Enter your phone number"
        type="tel"
        id="phone"
        name="phone"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.phone}
      />
      {formik.touched.phone && formik.errors.phone && <div className={styles.error}>{formik.errors.phone}</div>}
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
      <Button disabled={Object.entries(formik.errors) ? false : true} type="submit" color='var(--default-blue)'>Sign In</Button>
      <span>Do you have an account? <Link to='/'>Log In</Link></span>
    </form>
  )
}

export default Register