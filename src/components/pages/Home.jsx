import { useContext, useEffect, useState } from 'react';

import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import NotFoundPizzas from '../NotFoundPizzas';
import Pagination from '../Pagination';
import { searchContext } from '../../App';

function Home() {
  const { searchValue } = useContext(searchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({
    title: 'Популярности',
    sortBy: 'rating',
    order: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const pageCount = Math.ceil(items.length / pageSize);

  useEffect(() => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = `sortBy=${activeSort.sortBy}&order=${activeSort.order}`;

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
  }, [activeCategory, activeSort, searchValue, currentPage]);

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
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(id) => setActiveCategory(id)}
        />
        <Sort
          activeSort={activeSort}
          onChangeSort={(obj) => setActiveSort(obj)}
        />
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
