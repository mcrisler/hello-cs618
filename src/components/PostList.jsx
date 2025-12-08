// src/components/PostList.jsx
import { Fragment } from "react";
import PropTypes from "prop-types";
import { Post } from "./Post.jsx";

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => {
        const likeCount = post.likeCount ?? 0;

        return (
          <Fragment key={post._id}>
            <Post {...post} likes={likeCount} />
            <hr />
          </Fragment>
        );
      })}
    </div>
  );
}
PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
