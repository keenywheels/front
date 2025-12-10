'use client';

import { RegisterDialog } from './ui/register-dialog.ui';
import { VKIDButton } from './ui/vkid-button.ui';

interface Props {
  containerID: string;
  active?: boolean;
}

export const VKIDAuth = ({ containerID, active = true }: Props) => {
  return (
    <>
      <VKIDButton containerID={containerID} active={active} />
      <RegisterDialog />
    </>
  );
};
