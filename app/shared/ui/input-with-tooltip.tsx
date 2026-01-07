import * as React from 'react';

import { Input } from '@shared/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shared/ui/tooltip';

interface InputWithTooltipProps extends React.ComponentProps<typeof Input> {
  tooltip?: React.ReactNode;
}

export const InputWithTooltip: React.FC<InputWithTooltipProps> = ({
  tooltip,
  ...inputProps
}) => {
  if (!tooltip) {
    return <Input {...inputProps} />;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Input {...inputProps} />
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p className="max-w-[400px]">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
