import style from './Search.module.scss';
import searchImg from '../../assets/img/search_icon.svg';
import removeIcon from '../../assets/img/remove_icon.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { selectorFilter, setSearchValue } from '../redux/slices/filterSlice';

const Search = () => {
  const searchRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { selectedCategoryId } = useSelector(selectorFilter);

  useEffect(() => {
    setInputValue('');
  }, [selectedCategoryId]);

  const finalChangeInput = useCallback(
    debounce((value) => dispatch(setSearchValue(value)), 1000),
    [],
  );

  function handleChangeInput(e) {
    setInputValue(e.target.value);
    finalChangeInput(e.target.value);
  }

  function handleClearInput() {
    setInputValue('');
    dispatch(setSearchValue(''));
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
