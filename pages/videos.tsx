import React from 'react';
import { LoadingOverlay } from '@mantine/core';

import useVideosQuery from '../src/hooks/useVideosQuery';

function Videos() {
  const { data, isLoading } = useVideosQuery();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
    </div>
  );
}

export default Videos;
