import style from './NotFoundPages.module.scss';

const NotFoundPages: React.FC = () => {
  return (
    <div className={style.root}>
      <span>😕</span>
      <br />
      <h1>Страница не найдена</h1>
    </div>
  );
};

export default NotFoundPages;
