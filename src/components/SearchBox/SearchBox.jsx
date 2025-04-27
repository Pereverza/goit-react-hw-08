import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filter/slice";
import { selectFilter } from "../../redux/filter/selectors";

import s from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={s.searchBox}>
      <label className={s.find}>Find contacts by name:</label>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}
