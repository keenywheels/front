import { useNavigate } from 'react-router';

import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@shared/ui/pagination';

interface PaginationProps {
  page: number;
}

export const Pagination = ({ page }: PaginationProps) => {
  const navigate = useNavigate();

  const switchPage = (newPage: number) => {
    navigate(`?page=${newPage}`, { preventScrollReset: true });
  };

  const prevPage = page - 1;
  const nextPage = page + 1;

  const isPrevActive = page > 1;

  return (
    <PaginationBase>
      <PaginationContent>
        <PaginationItem>
          {isPrevActive ? (
            <PaginationPrevious onClick={() => switchPage(prevPage)} />
          ) : (
            <PaginationPrevious
              isActive={false}
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => switchPage(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
};
