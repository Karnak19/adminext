import React from 'react';

import { Video } from '../../fetcher/contents/videos';

function Edito(data: Video) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Edito;
