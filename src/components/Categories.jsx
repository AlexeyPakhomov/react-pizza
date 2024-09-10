import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from './redux/slices/filterSlice';
import { categories } from '../utils/constants';

function Categories() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.filter.selectedCategoryId,
  );

  function handleChangeCategory(id) {
    dispatch(setCategoryId(id));
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => handleChangeCategory(i)}
            className={selectedCategory === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
