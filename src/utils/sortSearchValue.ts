import { TPizzaItem } from '../redux/slices/pizzasSlice';

export function sortSearchValue(arr: TPizzaItem[], sortBy: string, order: string) {
  arr.sort((a: TPizzaItem, b: TPizzaItem) => {
    switch (sortBy) {
      case 'rating':
        return order === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      case 'price':
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      case 'title':
        return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });
  return arr;
}
