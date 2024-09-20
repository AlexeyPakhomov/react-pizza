import style from './NotFoundPages.module.scss';

function NotFoundPages() {
  return (
    <div className={style.root}>
      <span>😕</span>
      <br />
      <h1>Страница не найдена</h1>
    </div>
  );
}

export default NotFoundPages;
