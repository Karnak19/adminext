import React from 'react';
import { Badge, DefaultMantineColor } from '@mantine/core';

function StatusBadge({ status }: { status: string }) {
  const statusColor = (status: string): DefaultMantineColor => {
    switch (status) {
      case 'active':
        return 'green';

      case 'encoded':
      case 'published':
        return 'teal';

      case 'draft':
        return 'pink';

      case 'vendor':
        return 'violet';

      case 'in_progress':
        return 'yellow';

      default:
        return 'blue';
    }
  };

  return <Badge color={statusColor(status)}>{status}</Badge>;
}

export default StatusBadge;
