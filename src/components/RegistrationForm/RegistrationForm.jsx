import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import s from "./RegistrationForm.module.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(7, "Min 7 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        navigate("/contacts");
      })
      .catch((error) => {
        alert(`Registration failed: ${error}`);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label>
          Name:
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={s.error} />
        </label>

        <label>
          Email:
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={s.error} />
        </label>

        <label>
          Password:
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={s.error} />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
