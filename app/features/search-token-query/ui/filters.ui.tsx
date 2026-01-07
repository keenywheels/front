import * as React from 'react';

import { cn } from '@app/shared/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@shared/ui/accordion';

type SearchTokenFiltersProps = {
  children: React.ReactNode;
  className?: string;
};

export const SearchFilters = ({
  children,
  className,
}: SearchTokenFiltersProps) => {
  return (
    <Accordion type="single" collapsible className={cn('w-full', className)}>
      <AccordionItem value="filters">
        <AccordionTrigger className="text-xs text-muted-foreground pb-2">
          Расширенные параметры
        </AccordionTrigger>
        <AccordionContent>
          <div>{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
