import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "../ContactForm/ContactForm.module.css";
import { toast } from "react-toastify";
import { selectContacts } from "../../redux/contacts/selectors";

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required("Required"),
  number: Yup.string().min(3).max(20).required("Required"),
});

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.warning(`${values.name} is already in contacts`);
      actions.resetForm();
      return;
    }

    dispatch(addContact({ name: values.name, number: values.number }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label className={s.label}>
          Name
          <Field className={s.input} type="text" name="name" />
          <ErrorMessage name="name" component="div" className={s.error} />
        </label>

        <label className={s.label}>
          Number
          <Field className={s.input} type="tel" name="number" />
          <ErrorMessage name="number" component="div" className={s.error} />
        </label>

        <button type="submit" className={s.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
