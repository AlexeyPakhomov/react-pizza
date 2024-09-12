import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { pageSize, sortingOptions } from '../../utils/constants';
import { setCurrentPage, setFilter } from '../redux/slices/filterSlice';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import NotFoundPizzas from '../NotFoundPizzas/NotFoundPizzas';
import Pagination from '../Pagination/Pagination';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCategoryId, selectedSort, searchValue, currentPage } =
    useSelector((state) => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pageCount = Math.ceil(items.length / pageSize);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  function fetchPizza() {
    const category =
      selectedCategoryId > 0 ? `category=${selectedCategoryId}` : '';
    const sortBy = `sortBy=${selectedSort.sortBy}&order=${selectedSort.order}`;

    setIsLoading(true);
    axios
      .get(
        `https://66d6c751006bfbe2e64e8d5f.mockapi.io/items?${category}&${sortBy}`,
      )
      .then((response) => {
        const pizzas = response.data;

        if (searchValue) {
          const pizzasSearch = pizzas.filter((pizza) =>
            pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
          );

          setItems(pizzasSearch);
          dispatch(setCurrentPage(1));
        } else {
          setItems(pizzas);
        }
        setIsLoading(false);
      });
  }

  // Пропускает первый рендер с голым URL и начинает работать со второго рендера если затронуты зависимости (добавляет параметры к URL)
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        selectedCategoryId,
        selectedSort: selectedSort.sortBy,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [selectedCategoryId, selectedSort, searchValue, currentPage]);

  //Если в первом рендере были параметры в URL, то обновляем их в редакс
  useEffect(() => {
    console.log('зашли window.location.search');

    if (window.location.search) {
      const urlParams = qs.parse(window.location.search.slice(1));
      const sortObj = sortingOptions.find(
        (item) => item.sortBy === urlParams.selectedSort,
      );

      dispatch(setFilter({ ...urlParams, selectedSort: sortObj }));

      isSearch.current = true;
      console.log('вышли window.location.search');
    }
  }, []);

  // isSearch позволяет избежать двойного рендера при первом запросе если url с параметрами
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizza();
    }

    isSearch.current = false;
  }, [selectedCategoryId, selectedSort, searchValue, currentPage]);

  function pagination(arr, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    return [...arr].splice(startIndex, pageSize);
  }

  function handleChangePage(page) {
    if (page < 1) return 1;
    if (page > pageCount) return pageCount;

    setIsLoading(true);
    dispatch(setCurrentPage(page));
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
