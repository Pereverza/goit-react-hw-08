import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import s from "../../App.module.css";
import { toast } from "react-toastify";

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
        toast.error(`Registration failed: ${error}`);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <div className={s.fieldWrapper}>
          <label htmlFor="name" className={s.label}>
            Name:
          </label>
          <Field id="name" className={s.input} type="text" name="name" />
          <ErrorMessage name="name" component="div" className={s.error} />
        </div>

        <div className={s.fieldWrapper}>
          <label htmlFor="email" className={s.label}>
            Email:
          </label>
          <Field id="email" className={s.input} type="email" name="email" />
          <ErrorMessage name="email" component="div" className={s.error} />
        </div>

        <div className={s.fieldWrapper}>
          <label htmlFor="password" className={s.label}>
            Password:
          </label>
          <Field
            id="password"
            className={s.input}
            type="password"
            name="password"
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
