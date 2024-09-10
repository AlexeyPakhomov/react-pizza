import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import NotFoundPizzas from '../NotFoundPizzas';
import Pagination from '../Pagination';
import { pageSize } from '../../utils/constants';

function Home() {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedCategoryId, selectedSort } = useSelector(
    (state) => state.filter,
  );
  const pageCount = Math.ceil(items.length / pageSize);

  useEffect(() => {
    const category =
      selectedCategoryId > 0 ? `category=${selectedCategoryId}` : '';
    const sortBy = `sortBy=${selectedSort.sortBy}&order=${selectedSort.order}`;

    setIsLoading(true);
    fetch(
      `https://66d6c751006bfbe2e64e8d5f.mockapi.io/items?${category}&${sortBy}`,
    )
      .then((res) => res.json())
      .then((pizzas) => {
        if (searchValue) {
          const pizzasSearch = pizzas.filter((pizza) =>
            pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
          );

          setItems(pizzasSearch);
          setCurrentPage(1);
        } else {
          setItems(pizzas);
        }
        setIsLoading(false);
      });
  }, [selectedCategoryId, selectedSort, searchValue, currentPage]);

  function pagination(arr, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    return [...arr].splice(startIndex, pageSize);
  }

  function handleChangePage(page) {
    if (page < 1) return 1;
    if (page > pageCount) return pageCount;

    setIsLoading(true);
    setCurrentPage(page);
    setIsLoading(false);
  }

  const arrPagination = pagination(items, currentPage, pageSize);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading ? (
        <div className="content__items">
          {[...new Array(6)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : items.length > 0 ? (
        <>
          <div className="content__items">
            {arrPagination.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
        </>
      ) : (
        <NotFoundPizzas />
      )}
    </>
  );
}

export default Home;
