import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { pageSize, sortingOptions } from '../../utils/constants';
import {
  selectorFilter,
  setCurrentPage,
  setFilter,
} from '../redux/slices/filterSlice';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import NotFoundPizzas from '../NotFoundPizzas/NotFoundPizzas';
import Pagination from '../Pagination/Pagination';
import {
  fetchPizzas,
  selectorPizzas,
  setPizzas,
} from '../redux/slices/pizzasSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCategoryId, selectedSort, searchValue, currentPage } =
    useSelector(selectorFilter);
  const { pizzaItems, status } = useSelector(selectorPizzas);

  const pageCount = Math.ceil(pizzaItems.length / pageSize);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  function fetchPizza() {
    const category =
      selectedCategoryId > 0 ? `category=${selectedCategoryId}` : '';
    const sortBy = `sortBy=${selectedSort.sortBy}&order=${selectedSort.order}`;

    if (searchValue) {
      const pizzasSearch = pizzaItems.filter((pizza: any) =>
        pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
      dispatch(setPizzas(pizzasSearch));
      dispatch(setCurrentPage(1));
    } else {
      // @ts-ignore
      dispatch(fetchPizzas({ category, sortBy }));
    }
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
    if (window.location.search) {
      const urlParams = qs.parse(window.location.search.slice(1));
      const sortObj = sortingOptions.find(
        (item) => item.sortBy === urlParams.selectedSort,
      );

      dispatch(setFilter({ ...urlParams, selectedSort: sortObj }));

      isSearch.current = true;
    }
  }, []);

  // isSearch позволяет избежать двойного рендера при первом запросе если url с параметрами
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
  }, [selectedCategoryId, selectedSort, searchValue, currentPage]);

  function pagination(arr: any, currentPage: number, pageSize: number) {
    const startIndex = (currentPage - 1) * pageSize;
    return [...arr].splice(startIndex, pageSize);
  }

  function handleChangePage(page: number) {
    if (page < 1) return 1;
    if (page > pageCount) return pageCount;

    dispatch(setCurrentPage(page));
  }

  const arrPagination = pagination(pizzaItems, currentPage, pageSize);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'loading' && (
        <div className="content__items">
          {[...new Array(6)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}{' '}
      {status === 'success' && pizzaItems.length > 0 ? (
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
        <NotFoundPizzas
          title="Пиццы не найдены"
          text="Попробуйте изменить запрос."
        />
      )}
      {status === 'error' && (
        <NotFoundPizzas
          title="Произошла ошибка"
          text="Попробуйте повторить позднее."
        />
      )}
    </>
  );
}

export default Home;
