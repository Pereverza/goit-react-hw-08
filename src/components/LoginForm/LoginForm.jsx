import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/operations";
import s from "../../App.module.css";

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
        <div className={s.fieldWrapper}>
          <label htmlFor="email" className={s.label}>
            Email:
          </label>
          <Field id="email" name="email" type="email" className={s.input} />
          <ErrorMessage name="email" component="div" className={s.error} />
        </div>

        <div className={s.fieldWrapper}>
          <label htmlFor="password" className={s.label}>
            Password:
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            className={s.input}
          />
          <ErrorMessage name="password" component="div" className={s.error} />
        </div>

        <button type="submit" className={s.button}>
          Register
        </button>
      </Form>
    </Formik>
  );
}
