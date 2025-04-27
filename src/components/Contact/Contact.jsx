import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import s from "../../App.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={s.contactItem}>
      <p>
        {contact.name}: {contact.number}
      </p>
      <button className={s.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
