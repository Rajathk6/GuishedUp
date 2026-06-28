import api from "./axios";

export async function createInteraction(
  postId: number,

  type: "view" | "reaction" | "reply",
) {
  return api.post(
    "/interactions",

    {
      post_id: postId,

      type,
    },
  );
}
