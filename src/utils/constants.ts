export type TSortItem = {
  title: string;
  sortBy: string;
  order: string;
};

export const sortingOptions: TSortItem[] = [
  { title: 'Популярности', sortBy: 'rating', order: 'desc' },
  { title: 'Дешевле', sortBy: 'price', order: 'asc' },
  { title: 'Дороже', sortBy: 'price', order: 'desc' },
  { title: 'Названию (А-Я)', sortBy: 'title', order: 'asc' },
  { title: 'Названию (Я-А)', sortBy: 'title', order: 'desc' },
];

export const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Микс',
];

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
