import React, { useState, useEffect } from "react";
import api from "../../../api";
import Resource from "../../../components/Resource";
import { USER_ROLE } from "../../../constants";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../../components/LoadingIndicator";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown"; // Import the new component
import "../../../styles/Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [error, setError] = useState(""); // Error state to handle API errors

  const userRole = localStorage.getItem(USER_ROLE);
  const isStudent = userRole === "student";

  // Fetch resources, tags, and categories when the component mounts
  useEffect(() => {
    setLoading(true);
    getTags();
    getCategories();
    getResources();
  }, []);

  // Fetch resources based on selected tags and categories
  const getResources = (tags = [], categories = []) => {
    let url = "/api/resources/library/";
    let params = [];

    if (tags.length > 0) {
      params = [...params, ...tags.map((id) => `tags=${id}`)];
    }
    if (categories.length > 0) {
      params = [...params, ...categories.map((id) => `categories=${id}`)];
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    api
      .get(url)
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => {
        setError(
          "Failed to fetch resources: " +
            (err.response?.data?.detail || err.message)
        );
      })
      .finally(() => {
        setLoading(false); // Hide loading indicator after fetching data
      });
  };

  // Fetch tags for filtering resources
  const getTags = () => {
    api
      .get("/api/resources/tags/")
      .then((res) => {
        setAllTags(res.data);
      })
      .catch((err) => {
        setError(
          "Failed to fetch tags: " + (err.response?.data?.detail || err.message)
        );
      });
  };

  // Fetch categories for filtering resources
  const getCategories = () => {
    api
      .get("/api/resources/categories/")
      .then((res) => {
        setAllCategories(res.data);
      })
      .catch((err) => {
        setError(
          "Failed to fetch categories: " +
            (err.response?.data?.detail || err.message)
        );
      });
  };

  // Handle tag filter changes
  const handleTagChange = (id) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(id)
        ? prevTags.filter((tagId) => tagId !== id)
        : [...prevTags, id]
    );
  };

  // Handle category filter changes
  const handleCategoryChange = (id) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(id)
        ? prevCategories.filter((categoryId) => categoryId !== id)
        : [...prevCategories, id]
    );
  };

  // Fetch resources when selected tags or categories change
  useEffect(() => {
    getResources(selectedTags, selectedCategories);
  }, [selectedTags, selectedCategories]);

  // Show loading indicator while data is being fetched
  if (loading) return <LoadingIndicator />;

  // Display error message if there's an error
  if (error) return <p>{error}</p>;

  return (
    <div className="resources-page">
      <h1 className="resource-title">Resources</h1>
      {/* Display link to user's own resources if not a student */}
      {!isStudent && (
        <Link className="your-resources" to={`/yourresources`}>
          Your Resources
        </Link>
      )}
      <br />
      <div className="filter-resources">
        <div className="filter-categories">
          <MultiSelectDropdown
            items={allCategories}
            selectedItems={selectedCategories}
            onSelectItem={handleCategoryChange}
            placeholder="Filter categories"
          />
        </div>
        <div className="filter-tags">
          <MultiSelectDropdown
            items={allTags}
            selectedItems={selectedTags}
            onSelectItem={handleTagChange}
            placeholder="Filter tags"
          />
        </div>
      </div>
      <br />
      <div className="all-resource-container">
        {/* Display the list of resources */}
        {resources.length > 0 ? (
          resources
            .slice()
            .reverse()
            .map((resource) => (
              <Resource
                resource={resource}
                onDelete={() => {}}
                hideDeleteButton
                resourceGallery
                key={resource.id}
              />
            ))
        ) : (
          <p>No resources found.</p>
        )}
      </div>
    </div>
  );
}

export default Resources;
