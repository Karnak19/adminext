import { categories } from './contents/categories';
import { categoryById } from './contents/categoryById';
import { videoById } from './contents/videoById';
import { videos } from './contents/videos';
import { accounts } from './users/accounts';
import { fanById } from './users/fanById';
import { fans } from './users/fans';
import { login } from './users/login';
import { context, me } from './users/me';

export const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
export const USERS_SERVICE_URL = `${API_GATEWAY_URL}/users-service-api`;
export const MAIN_API_URL = `${API_GATEWAY_URL}/main-api`;

const fetcher = {
  login,
  getMe: me,
  getMeContext: context,
  getAccounts: accounts,
  getVideos: videos,
  getVideoById: videoById,
  getCategoryById: categoryById,
  getCategories: categories,
  getFans: fans,
  getFanById: fanById,
};

export default fetcher;
