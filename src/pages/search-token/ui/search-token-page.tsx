import { SearchTokenForm } from '@features/search-token';
import { PageLayout } from '@shared/ui/page-layout.tsx';

export const SearchTokenPage = () => {
  return (
    <PageLayout className="h-full">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SearchTokenForm />
        </div>
      </div>
    </PageLayout>
  );
};
