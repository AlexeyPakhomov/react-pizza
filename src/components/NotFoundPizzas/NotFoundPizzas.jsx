import style from './NotFoundPizzas.module.scss';

const NotFoundPizzas = ({ title, text }) => {
  return (
    <>
      <h2 className={style.notFoundPizza}>{title}</h2>
      <p className={style.notFoundPizza__text}>{text}</p>
    </>
  );
};

export default NotFoundPizzas;
