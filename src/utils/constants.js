export const pageSize = 4;
export const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Микс',
];

export const sortingOptions = [
  { title: 'Популярности', sortBy: 'rating', order: 'desc' },
  { title: 'Дешевле', sortBy: 'price', order: 'asc' },
  { title: 'Дороже', sortBy: 'price', order: 'desc' },
  { title: 'Названию (А-Я)', sortBy: 'title', order: 'asc' },
  { title: 'Названию (Я-А)', sortBy: 'title', order: 'desc' },
];
