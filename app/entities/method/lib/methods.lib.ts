import type { UserTokenSub } from '@app/shared/api';

export const methods: Record<UserTokenSub['method'], string> = {
  denormalized: 'Ненормированный интерес',
  global_median: 'Нормирование глобальной медианой',
  category_median: 'Нормирование медианой категории',
} as const;

type Method = keyof typeof methods;

export const mapMethodToLabel = (method: Method) => {
  return methods[method];
};

export const methodOptions = (Object.keys(methods) as Method[]).map((key) => ({
  value: key,
  label: methods[key],
}));
