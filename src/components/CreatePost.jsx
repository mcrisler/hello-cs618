import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

import { Link } from "react-router-dom";
import slug from "slug";

import { useMutation as useGraphQLMutation } from "@apollo/client/react/index.js";
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from "../api/graphql/posts.js";

export function CreatePost() {
  const [token] = useAuth();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [createPost, { loading, data }] = useGraphQLMutation(CREATE_POST, {
    variables: { title, contents },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
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
        value={loading ? "Creating..." : "Publish"}
        disabled={!title || loading}
      />
      {data?.createPost ? (
        <>
          <br />
          Post{" "}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{" "}
          created successfully!
        </>
      ) : null}
    </form>
  );
}
