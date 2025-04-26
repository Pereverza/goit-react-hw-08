import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/operations";
import s from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(7, "Min 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        navigate("/contacts");
      })
      .catch((error) => {
        alert(`Login failed: ${error}`);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
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

        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
}
