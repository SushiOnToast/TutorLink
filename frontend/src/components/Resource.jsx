import React from "react";
import { USER_ROLE } from "../constants";
import { Link } from "react-router-dom";
import "../styles/Resource.css";

/**
 * Resource component displays details of a resource and provides options based on user role.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.resource - The resource data to display.
 * @param {Function} props.onDelete - The function to call when the delete button is clicked.
 * @param {boolean} props.hideDeleteButton - Determines if the delete button should be hidden.
 * @param {boolean} props.resourceGallery - Determines if "Read more" link should be shown.
 * @param {boolean} props.fullWidth - Determines if the resource container should be full width.
 * @returns {JSX.Element} The Resource component.
 */
function Resource({
  resource,
  onDelete,
  hideDeleteButton,
  resourceGallery,
  fullWidth = false, // Default to false if not provided
}) {
  const formattedDate = new Date(resource.created_at).toLocaleDateString("en-US");
  const userRole = localStorage.getItem(USER_ROLE);
  const isStudent = userRole === "student";

  const contentLimit = 100;

  const shouldShowReadMore = resource.content.length > contentLimit && resourceGallery;
  const shouldTruncate = shouldShowReadMore;

  return (
    <div
      className="resource-container"
      style={{ width: fullWidth ? "50%" : "300px"}} // Conditionally apply width
    >
      {/* Display categories */}
      {resource.categories && resource.categories.length > 0 && (
        <div className="category-display">
          {resource.categories.map((category) => (
            <p key={category.id}>
              <small>
                <strong>{category.name}</strong>
              </small>
            </p>
          ))}
        </div>
      )}
      <div
        className="cover"
        style={{
          width: "100%",
          height: 175,
          background:
            "radial-gradient(75.00% 75.00% at 50% 50%, #E79F8F 0%, #FFE1D6 100%)",
          borderRadius: 20,
        }}
      />
      <div className="text-content">
        <h3 className="resource-title">{resource.title}</h3>
        <small className="resource-date">
          <i>{formattedDate}</i>
        </small>
        <p className="resource-type">
          <u>{resource.resource_type}</u>
        </p>

        {/* Display tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="tag-display">
            {resource.tags.map((tag) => (
              <p className="tag" key={tag.id}>
                {tag.name}
              </p>
            ))}
          </div>
        )}

        {/* Display resource content */}
        <p className="resource-content">
          {!shouldTruncate
            ? resource.content
            : resource.content.slice(0, contentLimit) +
              (resource.content.length > contentLimit ? "..." : "")}
        </p>

        {/* Display "Read more" link if applicable */}
        {shouldShowReadMore && (
          <Link
            className="read-more"
            to={`/yourresources/${resource.slug}`}
          >
            Read more
          </Link>
        )}

        {/* Display author information */}
        {hideDeleteButton && (
          <p className="resource-author">
            By{" "}
            <a className="author-link" href={`/profile/${resource.author_username}`}>
              {resource.author_username}
            </a>
          </p>
        )}
        <br />

        {/* Display delete button if applicable */}
        {!hideDeleteButton && !isStudent && (
          <button
            className="delete-resource"
            onClick={() => onDelete(resource.id)}
          >
            Delete resource
          </button>
        )}
      </div>
    </div>
  );
}

export default Resource;
