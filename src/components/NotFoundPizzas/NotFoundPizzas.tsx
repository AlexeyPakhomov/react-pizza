import style from './NotFoundPizzas.module.scss';

type NotFoundPizzasProps = {
  title: string;
  text: string;
};

const NotFoundPizzas: React.FC<NotFoundPizzasProps> = ({ title, text }) => {
  return (
    <>
      <h2 className={style.notFoundPizza}>{title}</h2>
      <p className={style.notFoundPizza__text}>{text}</p>
    </>
  );
};

export default NotFoundPizzas;
