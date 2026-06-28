import api from "./axios";

export async function getFeed(page = 1, limit = 10) {
  const response = await api.get(
    "/feed",

    {
      params: {
        page,

        limit,
      },
    },
  );

  return response.data;
}
