// src/components/Notification.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import slug from "slug";

export function NotificationBanner({ title, postId, onClose }) {
  const postPath = `/posts/${postId}/${slug(title)}`;

  return (
    <div>
      <span>
        NEW RECIPE ALERT:{" "}
        <Link to={postPath} onClick={onClose}>
          {title}!
        </Link>
      </span>
    </div>
  );
}
NotificationBanner.propTypes = {
  title: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
