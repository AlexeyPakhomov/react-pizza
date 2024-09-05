import { useEffect, useState } from 'react';

import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({
    title: 'Популярности',
    sortBy: 'rating',
    order: 'desc',
  });

  useEffect(() => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = `sortBy=${activeSort.sortBy}&order=${activeSort.order}`;

    setIsLoading(true);
    fetch(
      `https://66d6c751006bfbe2e64e8d5f.mockapi.io/items?${category}&${sortBy}`,
    )
      .then((res) => res.json())
      .then((pizzas) => {
        setItems(pizzas);
        setIsLoading(false);
      });
  }, [activeCategory, activeSort]);

  return (
    <>
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(id) => setActiveCategory(id)}
        />
        <Sort
          activeSort={activeSort}
          onChangeSort={(obj) => setActiveSort(obj)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(activeCategory === 0 ? 6 : 3)].map((_, i) => (
              <Skeleton key={i} />
            ))
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
}

export default Home;
