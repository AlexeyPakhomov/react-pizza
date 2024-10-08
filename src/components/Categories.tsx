import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorFilter, setCategoryId } from '../redux/slices/filterSlice';
import { categories } from '../utils/constants';

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { selectedCategoryId } = useSelector(selectorFilter);

  function handleChangeCategory(id: number) {
    dispatch(setCategoryId(id));
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => handleChangeCategory(i)}
            className={selectedCategoryId === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
