import React from 'react';
import { Badge } from '@mantine/core';

function ProviderBadge({ provider }: { provider: string }) {
  const providerColor = (provider: string) => {
    switch (provider) {
      case 'stripe':
        return 'grape';
      default:
        return 'blue';
    }
  };

  return <Badge color={providerColor(provider)}>{provider}</Badge>;
}

export default ProviderBadge;
