import { getCookie } from 'cookies-next';

export const ACCESS_TOKEN_KEY = 'ORIGINS_ACCESS_TOKEN';
const getToken = () => getCookie(ACCESS_TOKEN_KEY)?.toString();

export default getToken;
