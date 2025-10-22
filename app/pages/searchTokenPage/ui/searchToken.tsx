import { SearchTokenForm } from '@features/searchToken';

export const SearchTokenPage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col">
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-6 text-center">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Введите ключевое слово
            </h2>
            <p className="text-base text-muted-foreground">
              Покажем насколько популярна тема среди аудитории
            </p>
          </div>
          <SearchTokenForm />
        </div>
      </div>
    </div>
  );
};
