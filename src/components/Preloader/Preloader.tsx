import style from './Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={style.preloader}>
      <div className={style.preloader__container}>
        <span className={style.preloader__round}></span>
      </div>
    </div>
  );
};

export default Preloader;
