import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './FulPizza.module.scss';
import axios from 'axios';
import { TPizzaItem } from '../../redux/slices/pizzasSlice';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectPizza, setSelectPizza] = useState<TPizzaItem>();

  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get('https://66d6c751006bfbe2e64e8d5f.mockapi.io/items/' + id);
      setSelectPizza(data);
    } catch (error) {
      console.log('Ошибка загрузки пиццы', error);

      navigate('/');
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div className={`container ${style.fullPizza}`}>
      {selectPizza && (
        <>
          <Link className={style.fullPizza__btn} to="/">
            <button className="button button--outline button--add">
              <span>Назад</span>
            </button>
          </Link>
          <img
            className={style.fullPizza__img}
            src={selectPizza.imageUrl}
            alt={selectPizza.title}
          />
          <h2 className={style.fullPizza__title}>{selectPizza.title}</h2>
          <h4 className={style.fullPizza__description}>{selectPizza.description}</h4>
        </>
      )}
    </div>
  );
};

export default FullPizza;
