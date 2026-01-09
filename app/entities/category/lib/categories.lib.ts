export const categories = {
  news: 'Новости',
  marketplace: 'Маркетплейсы',
  review: 'Отзывы',
} as const;

type Category = keyof typeof categories;

export const mapCategoryToLabel = (category: Category) => {
  return categories[category];
};

export const categoryOptions = (Object.keys(categories) as Category[]).map(
  (key) => ({
    value: key,
    label: categories[key],
  }),
);
