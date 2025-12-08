// src/components/Post.jsx
import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { Link } from "react-router-dom";

import slug from "slug";

export function Post({
  title,
  contents,
  author,
  image,
  ingredients,
  id,
  fullPost = false,
  likes,
  onLike,
  isLiking,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}

      {image && (
        <>
          <img
            src={image}
            alt=""
            style={{ maxWidth: "400px", maxHeight: "300px" }}
          />
          <br />
        </>
      )}

      {fullPost && ingredients && (
        <div
          style={{
            maxWidth: "1000px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          <h4>INGREDIENTS:</h4>
          <div>{ingredients}</div>
        </div>
      )}

      <br />

      {fullPost && contents && (
        <div
          style={{
            maxWidth: "1000px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          <h4>INSTRUCTIONS:</h4>
          <div>{contents}</div>
        </div>
      )}

      {fullPost && (
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
        >
          <button
            onClick={onLike}
            disabled={isLiking}
            style={{
              marginRight: "10px",
              cursor: "pointer",
              color: isLiking ? "grey" : "Blue",
            }}
          >
            Like Post
          </button>
        </div>
      )}

      <div>
        <span style={{ marginRight: "5px" }}>
          {likes !== undefined ? likes : 0} {likes === 1 ? "Like" : "Likes"}
        </span>
        {author && (
          <>
            <span style={{ margin: "0 5px" }}>|</span>
            <em>
              Written by <User {...author} />
            </em>
          </>
        )}
      </div>
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  image: PropTypes.string,
  ingredients: PropTypes.string,
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
  likes: PropTypes.number,
  onLike: PropTypes.func,
  isLiking: PropTypes.bool,
};
