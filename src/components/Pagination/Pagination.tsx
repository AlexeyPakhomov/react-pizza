import { useSelector } from 'react-redux';
import style from './Pagination.module.scss';
import { selectorFilter } from '../redux/slices/filterSlice';

type PaginationProps = {
  pageCount: number;
  handleChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  handleChangePage,
}) => {
  const { currentPage } = useSelector(selectorFilter);

  function createArrPages(pageCount: number) {
    const pageNumbers = [];

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  return (
    <>
      <nav className={style.pagination}>
        <ul className={style.pagination__list}>
          <li className={style.pagination__item}>
            <svg
              className={style.pagination__arrow}
              onClick={() => handleChangePage(currentPage - 1)}
              height="512px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="512px"
              xmlns="http://www.w3.org/2000/svg">
              <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
            </svg>
          </li>

          {createArrPages(pageCount).map((page) => (
            <li
              key={page}
              onClick={() => handleChangePage(page)}
              className={`${style.pagination__item} ${
                page === currentPage ? `${style.active}` : ''
              }`}>
              {page}
            </li>
          ))}

          <li className={style.pagination__item}>
            <svg
              className={style.pagination__arrow}
              onClick={() => handleChangePage(currentPage + 1)}
              height="512px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="512px"
              xmlns="http://www.w3.org/2000/svg">
              {' '}
              <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
            </svg>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
