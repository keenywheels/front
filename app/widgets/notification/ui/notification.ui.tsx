'use client';

import { Toaster } from '@shared/ui/sonner';

export function Notification() {
  return <Toaster position="bottom-left" duration={3000} />;
}
