'use client';

import { Info } from 'lucide-react';

import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shared/ui/tooltip';

interface TooltipProps {
  className?: string;
}

export const Tooltip = ({ className }: TooltipProps) => {
  return (
    <div className={className}>
      <BaseTooltip>
        <TooltipTrigger>
          <Info className="h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[200px] text-center">
            Показывает, насколько тема популярна относительно среднего уровня
            интереса к остальным темам
          </p>
        </TooltipContent>
      </BaseTooltip>
    </div>
  );
};
