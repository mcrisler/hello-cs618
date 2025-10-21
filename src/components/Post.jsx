import PropTypes from "prop-types";
import { User } from "./User.jsx";

export function Post({ title, contents, author: userId, image, ingredients }) {
  return (
    <article>
      <h1>{title}</h1>
      {image && (
        <img
          src={image}
          alt=""
          style={{ maxWidth: "500px", maxHeight: "400px" }}
        />
      )}
      <br />
      {ingredients && (
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
      {contents && (
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
      {userId && (
        <em>
          <br />
          <br />
          Published by <User id={userId} />
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
};
