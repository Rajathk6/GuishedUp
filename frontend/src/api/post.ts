import api from "./axios";

export async function createPost(content: string, image_url?: string) {
  const response = await api.post("/posts", {
    content,

    image_url,
  });

  return response.data;
}
