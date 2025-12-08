// src/api/likes.js
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const LIKE_BASE_URL = `${BACKEND_URL}/posts`;

export const likePost = async (postId, token) => {
  const res = await fetch(`${LIKE_BASE_URL}/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
