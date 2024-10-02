import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { sortingOptions, Status } from '../../utils/constants';
import useResize from '../../hooks/useResize';
import { Skeleton, PizzaBlock, NotFoundPizzas, Categories, Sort, Pagination } from '../index';
import { useAppDispatch } from '../redux/store';
import { selectorFilter, setCurrentPage, setFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectorPizzas, setPizzas } from '../redux/slices/pizzasSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedCategoryId, selectedSort, searchValue, currentPage } =
    useSelector(selectorFilter);
  const { pizzaItems, status } = useSelector(selectorPizzas);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const width = useResize();
  const pageSize = (width >= 1061 && width < 1441 && 3) || 4;
  const pageCount = Math.ceil(pizzaItems.length / pageSize);

  function fetchPizza() {
    const category = selectedCategoryId > 0 ? `category=${selectedCategoryId}` : '';
    const sortBy = `sortBy=${selectedSort.sortBy}&order=${selectedSort.order}`;

    if (searchValue) {
      const pizzasSearch = pizzaItems.filter((pizza: any) =>
        pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
      dispatch(setPizzas(pizzasSearch));
      dispatch(setCurrentPage(1));
    } else {
      dispatch(fetchPizzas({ category, sortBy }));
    }
  }

  // Пропускает первый рендер с базовым URL и начинает работать со второго рендера если затронуты зависимости (добавляет параметры к URL)
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
      const sortObj = sortingOptions.find((item) => item.sortBy === urlParams.selectedSort);

      if (urlParams && sortObj) {
        dispatch(
          setFilter({
            selectedCategoryId: Number(urlParams.selectedCategoryId),
            selectedSort: sortObj,
            currentPage: Number(urlParams.currentPage),
          }),
        );
      }

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

  if (status === Status.ERROR) {
    return <NotFoundPizzas title="Произошла ошибка" text="Попробуйте повторить позднее." />;
  }

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.LOADING ? (
        <>
          <div className="content__items">
            {[...new Array(pageSize)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </>
      ) : status === Status.SUCCESS && pizzaItems.length > 0 ? (
        <>
          <div className="content__items">
            {arrPagination.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
          <Pagination pageCount={pageCount} handleChangePage={handleChangePage} />
        </>
      ) : (
        <NotFoundPizzas title="Пиццы не найдены" text="Попробуйте изменить запрос." />
      )}
    </>
  );
};

export default Home;
