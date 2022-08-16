import { useWindowEvent } from '@mantine/hooks';
import { useRouter } from 'next/router';

function useEscapeKey(path: string) {
  const router = useRouter();
  useWindowEvent('keydown', (e) => {
    if (e.key === 'Escape') {
      router.push(path);
    }
  });
}

export default useEscapeKey;
