// src/api/posts.js
export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  );
  return await res.json();
};

export const getPostById = async (postId) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/
posts/${postId}`);
  return await res.json();
};

export const createPost = async (token, post) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/
posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    },
  );
  return await res.json();
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const likePost = async (postId) => {
  const res = await fetch(`${BACKEND_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to like post");
  }

  return res.json();
};
