import style from './Search.module.scss';
import searchImg from '../../assets/img/search_icon.svg';
import removeIcon from '../../assets/img/remove_icon.svg';
import { useCallback, useContext, useRef, useState } from 'react';
import { searchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const searchRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const { setSearchValue } = useContext(searchContext);

  const finalChangeInput = useCallback(
    debounce((value) => setSearchValue(value), 1000),
    [],
  );

  function handleChangeInput(e) {
    setInputValue(e.target.value);
    finalChangeInput(e.target.value);
  }

  function handleClearInput() {
    setInputValue('');
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
        value={inputValue}
        onChange={(e) => handleChangeInput(e)}
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
