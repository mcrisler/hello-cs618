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
  _id,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}/${slug(title)}`}>
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

      {author && (
        <em>
          {fullPost && <br />}
          Written by <User id={author} />
        </em>
      )}
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  ingredients: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
};
