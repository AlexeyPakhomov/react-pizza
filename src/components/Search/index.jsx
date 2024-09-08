import style from './Search.module.scss';
import searchImg from '../../assets/img/search_icon.svg';
import removeIcon from '../../assets/img/remove_icon.svg';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={style.searchBlock}>
      <img
        className={style.searchBlock__iconFind}
        src={searchImg}
        alt="search"
      />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={style.input}
        placeholder="Введите для поиска..."
      />
      <img
        onClick={() => setSearchValue('')}
        className={style.searchBlock__iconRemove}
        src={removeIcon}
        alt="remove"
      />
    </div>
  );
};

export default Search;
