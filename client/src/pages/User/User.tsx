/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate, defer, Await, useSubmit } from "react-router-dom"
import { Formik, ErrorMessage, Field } from "formik"
import Button from "../../components/Button"
import styles from './user.module.css'
import * as yup from 'yup';
import * as utils from '../../utils/index'
import type { LoaderFunctionArgs } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import type { UserState } from "../../store/features/userSlice";
import { Suspense } from "react";


const validationSchema = yup.object().shape({
  name: yup.string().required('İsim zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  phone: yup.string().test('phone', 'Geçerli bir telefon numarası girin', utils.validatePhoneNumber).required('Telefon numarası zorunludur'),
  role: yup.string(),
  active: yup.boolean()
});

const fetchUser = async (id: number): Promise<any | UserState> => {
  const user = await fetch(`http://localhost:3000/user/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return user.json()
}


export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const user = await fetchUser(id)
  return defer({ user });
}

export const userAction = async ({ params, request }: ActionFunctionArgs) => {
  const { id } = params;
  let payload = await request.formData();
  payload = {
    phone: Number(payload.get('phone')), name: payload.get('name'),
    email: payload.get('email'), active: Boolean(payload.get('active')), role: payload.get('role')
  }

  const user = await fetch(`http://localhost:3000/user/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return user.json();
}


function User() {
  const submit = useSubmit();
  const { user } = useLoaderData() as UserState;

  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  if (loading) return <div className="loader"><Loader /></div>

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={user}>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            active: user.active,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true)
            submit(values, {
              method: 'POST'
            })
            setLoading(false);
          }}
        >
          {({ isValid, handleSubmit, dirty }) => (
            <section className={styles.update}>
              <a onClick={(e) => {
                e.preventDefault();
                navigator(-1)
              }}>Back to the User</a>
              <header>
                <h1>Update User</h1>
              </header>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    component='input'
                  />
                  <ErrorMessage name="name" />
                </div>

                <div>
                  <label htmlFor="email">Mail</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    component='input'
                  />
                  <ErrorMessage name="email" />
                </div>

                <div>
                  <label htmlFor="phone">Phone</label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    component='input'
                  />
                  <ErrorMessage name="phone" />
                </div>

                <div>
                  <label htmlFor="role">Role</label>
                  <Field name="role" id="role" component='select'>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </Field>
                </div>

                <div>
                  <label htmlFor="active">Active</label>
                  <label className={styles.switch} htmlFor="active">
                    <Field
                      type="checkbox"
                      id="active"
                      name="active"
                      component='input'
                    />
                    <div className={`${styles.slider} ${styles.round}`}></div>
                  </label>
                </div>
                <Button type="submit" disabled={!isValid || !dirty} color="var(--default-blue)">Update User</Button>
              </form>
            </section>
          )}
        </Formik>
      </Await>
    </Suspense>
  )

}

export default User