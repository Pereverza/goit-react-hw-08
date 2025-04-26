import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filter/slice";
import { selectFilter } from "../../redux/filter/selectors";

import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label>Find contacts by name:</label>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}
