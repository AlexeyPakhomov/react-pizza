function Categories({ activeCategory, onChangeCategory }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Микс',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
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
