import { useMutation } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { setCookie } from 'cookies-next';
import { CircleCheck } from 'tabler-icons-react';

import { ACCESS_TOKEN_KEY } from '../../app/getToken';
import { queryClient } from '../../app/queryClient';
import { login } from './fetcher';

const useLogin = () => {
  return useMutation<
    { token: string },
    unknown,
    {
      username: string;
      password: string;
    }
  >((user) => login(user.username, user.password).query(), {
    onSuccess: (res) => {
      setCookie(ACCESS_TOKEN_KEY, res.token);
      queryClient.fetchQuery(['me']);
      queryClient.fetchQuery(['context']);

      showNotification({
        message: 'Login successful',
        icon: <CircleCheck />,
        color: 'lime',
      });
    },
  });
};

export default useLogin;
