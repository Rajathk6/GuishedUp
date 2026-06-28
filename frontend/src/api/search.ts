import api from "./axios";

export async function searchPosts(query: string) {
  const response = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return response.data;
}
