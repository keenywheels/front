import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { categoryOptions } from '@app/entities/category';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';

export const FilterCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || '',
  );

  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat) setCategory(urlCat);
  }, [searchParams.get('category')]);

  const handleChange = (val: string) => {
    setCategory(val);
    const next = new URLSearchParams(searchParams);
    next.set('category', val);
    setSearchParams(next);
  };

  return (
    <div>
      <Select value={category} onValueChange={handleChange}>
        <SelectTrigger className="w-full text-xs text-muted-foreground">
          <SelectValue placeholder="Выберите категорию" />
        </SelectTrigger>

        <SelectContent>
          {categoryOptions.map((item) => (
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
