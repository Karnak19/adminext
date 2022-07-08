import getToken from "./getToken";

export const betterFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const response = await fetch(url, {
    headers: {
      Authorization:
        (token?.startsWith("Bearer ") ? token : `Bearer ${token}`) || "",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};
