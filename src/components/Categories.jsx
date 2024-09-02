import React, { useState } from 'react';

function Categories() {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => setActiveCategory(i)}
            className={
              activeCategory === i ? 'active' : ''
            }>
            {categoryName}
          </li>
        ))}
        ,
      </ul>
    </div>
  );
}

export default Categories;
