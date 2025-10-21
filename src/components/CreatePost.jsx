import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../api/posts.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export function CreatePost() {
  const [token] = useAuth();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, { title, contents, tags: [], image, ingredients }),
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  if (!token)
    return <div>Please log in to share all of your favorite recipes!</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title" style={{ display: "block" }}>
          Title:{" "}
        </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor="create-ingredients" style={{ display: "block" }}>
        Ingredients:
      </label>
      <textarea
        id="create-ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="create-contents" style={{ display: "block" }}>
        Instructions:
      </label>
      <textarea
        id="create-contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <div>
        <label htmlFor="create-image" style={{ display: "block" }}>
          Image Link:{" "}
        </label>
        <input
          type="url"
          id="create-image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />
      <input
        type="submit"
        value={createPostMutation.isPending ? "Creating..." : "Publish"}
        disabled={!title || createPostMutation.isPending}
      />
    </form>
  );
}
