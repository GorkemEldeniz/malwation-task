import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Button from "../../components/Button"
import styles from './user.module.css'
import * as yup from 'yup';
import * as utils from '../../utils/index'
import { updateUserById, getUsers } from "../../store/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";

const validationSchema = yup.object().shape({
  name: yup.string().required('İsim zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  phone: yup.string().test('phone', 'Geçerli bir telefon numarası girin', utils.validatePhoneNumber).required('Telefon numarası zorunludur'),
  role: yup.string(),
  active: yup.boolean()
});


function User() {

  const { id } = useParams();
  const { selectedUser } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      phone: selectedUser.phone,
      active: selectedUser.active,
    }, validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      await dispatch(updateUserById([values, id]));
      await dispatch(getUsers());
      setLoading(false);
    }
  })


  if (loading) return <div className='loader'><Loader /></div>

  return (
    <section className={styles.update}>
      <a onClick={(e) => {
        e.preventDefault();
        navigator(-1)
      }}>Back to the User</a>
      <header>
        <h1>Update User</h1>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">Mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && <div className={styles.error}>{formik.errors.phone}</div>}
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select name="role" id="role" value={formik.values.role} onChange={formik.handleChange}>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div>
          <label htmlFor="active">Active</label>
          <label className={styles.switch} htmlFor="active">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formik.values.active}
              onChange={formik.handleChange}
            />
            <div className={`${styles.slider} ${styles.round}`}></div>
          </label>
        </div>

        <Button type="submit" disabled={Object.entries(formik.errors) ? false : true} color="var(--default-blue)">Update User</Button>

      </form>

    </section>
  )
}

export default User