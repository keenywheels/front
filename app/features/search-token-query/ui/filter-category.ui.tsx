import { useQueryParam } from '@shared/lib/hooks/use-query-param';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';

const CATEGORIES = [
  { value: 'news', label: 'Новости' },
  { value: 'marketplace', label: 'Маркетплейсы' },
  { value: 'review', label: 'Отзывы' },
];

export const FilterCategory = () => {
  const [category, setCategory] = useQueryParam('category');

  return (
    <div>
      <Select value={category ?? ''} onValueChange={setCategory}>
        <SelectTrigger className="w-full text-xs text-muted-foreground">
          <SelectValue placeholder="Выберите категорию" />
        </SelectTrigger>

        <SelectContent>
          {CATEGORIES.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="text-xs text-muted-foreground"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
