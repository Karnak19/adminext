import React from 'react';
import { Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { ClipboardCheck, Copy } from 'tabler-icons-react';

function TdClipboardId({ id }: { id: string }) {
  const clipboard = useClipboard({ timeout: 1000 });
  return (
    <td>
      <Button
        color={!clipboard.copied ? 'indigo' : undefined}
        variant={clipboard.copied ? 'gradient' : undefined}
        gradient={clipboard.copied ? { from: 'teal', to: 'lime', deg: 105 } : undefined}
        leftIcon={clipboard.copied ? <ClipboardCheck /> : <Copy />}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          // So when we click the button, we are not redirecting to the page
          e.stopPropagation();
          clipboard.copy(id);
        }}
      >
        ID
      </Button>
    </td>
  );
}

export default TdClipboardId;
