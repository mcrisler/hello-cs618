// src/components/PostSorting.jsx
import PropTypes from "prop-types";

const sortOptions = {
  createdAt: "Publish Date",
  updatedAt: "Last Updated",
  "likedBy.length": "Like Count",
};

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  return (
    <div>
      <label htmlFor="sortBy">Filter by: </label>
      <select
        name="sortBy"
        id="sortBy"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {sortOptions[field] || field}
          </option>
        ))}
      </select>
      {" / "}
      <label htmlFor="sortOrder">Order: </label>
      <select
        name="sortOrder"
        id="sortOrder"
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value={"ascending"}>Bottom</option>
        <option value={"descending"}>Top</option>
      </select>
    </div>
  );
}
PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};
