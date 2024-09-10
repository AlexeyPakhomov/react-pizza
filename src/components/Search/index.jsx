import style from './Search.module.scss';
import searchImg from '../../assets/img/search_icon.svg';
import removeIcon from '../../assets/img/remove_icon.svg';
import { useContext, useRef } from 'react';
import { searchContext } from '../../App';

const Search = () => {
  const searchRef = useRef();
  const { searchValue, setSearchValue } = useContext(searchContext);

  function handleClearInput() {
    setSearchValue('');
    searchRef.current.focus();
  }

  return (
    <div className={style.searchBlock}>
      <img
        className={style.searchBlock__iconFind}
        src={searchImg}
        alt="search"
      />
      <input
        ref={searchRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={style.input}
        placeholder="Введите для поиска..."
      />
      <img
        onClick={() => handleClearInput()}
        className={style.searchBlock__iconRemove}
        src={removeIcon}
        alt="remove"
      />
    </div>
  );
};

export default Search;
