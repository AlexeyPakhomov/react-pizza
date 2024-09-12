import style from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={style.root}>
      <span>😕</span>
      <br />
      <h1>Страница не найдена</h1>
    </div>
  );
}

export default NotFoundBlock;
