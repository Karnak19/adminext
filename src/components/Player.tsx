import React from 'react';

import { useStore } from '../app/store';

function Player({ videoId, url }: { videoId: string; url: string }) {
  const accountKey = useStore((state) => state.account?.key);

  return <div>player here</div>;
}

export default Player;
