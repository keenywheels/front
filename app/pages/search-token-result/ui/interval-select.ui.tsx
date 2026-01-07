import { useSearchParams } from 'react-router';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';

const INTERVALS = [
  { value: '7d', label: 'Последние 7 дней', days: 7 },
  { value: '30d', label: 'Последние 30 дней', days: 30 },
  { value: '90d', label: 'Последние 90 дней', days: 90 },
];

export const IntervalSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get('interval') ?? '7d';

  const onChange = (val: string) => {
    const interval = INTERVALS.find((i) => i.value === val);
    if (!interval) return;

    const start = new Date(
      Date.now() - interval.days * 24 * 60 * 60 * 1000,
    ).toISOString();

    const next = new URLSearchParams(searchParams);
    next.set('interval', val);
    next.set('start', start);

    setSearchParams(next);
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {INTERVALS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
