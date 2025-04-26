import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.contactItem}>
      <p>
        {contact.name}: {contact.number}
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
