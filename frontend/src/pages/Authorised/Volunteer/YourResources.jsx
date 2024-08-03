import React, { useState, useEffect } from "react";
import api from "../../../api";
import Resource from "../../../components/Resource";
import LoadingIndicator from "../../../components/LoadingIndicator";
import "../../../styles/YourResources.css";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import SingleSelectDropdown from "../../../components/SingleSelectDropdown";

function YourResources() {
  const [resources, setResources] = useState([]); // State to store resources
  const [title, setTitle] = useState(""); // State to store the resource title
  const [content, setContent] = useState(""); // State to store the resource content
  const [resourceType, setResourceType] = useState("article"); // State to store the type of resource
  const [categories, setCategories] = useState([]); // State to store available categories
  const [tags, setTags] = useState([]); // State to store available tags
  const [selectedCategories, setSelectedCategories] = useState([]); // State to store selected categories
  const [selectedTags, setSelectedTags] = useState([]); // State to store selected tags
  const [loading, setLoading] = useState(false); // Loading state for fetching data

  // Fetch resources, categories, and tags when the component mounts
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true); // Set loading state to true while fetching resources
      try {
        const response = await api.get("/api/resources/");
        setResources(response.data);
      } catch (err) {
        alert("Error fetching resources: " + err.message);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/resources/categories/");
        setCategories(response.data);
      } catch (err) {
        alert("Error fetching categories: " + err.message);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await api.get("/api/resources/tags/");
        setTags(response.data);
      } catch (err) {
        alert("Error fetching tags: " + err.message);
      }
    };

    fetchResources();
    fetchCategories();
    fetchTags();
  }, []);

  // Function to refresh resource list
  const getResources = async () => {
    try {
      const response = await api.get("/api/resources/");
      setResources(response.data);
    } catch (err) {
      alert("Error fetching resources: " + err.message);
    }
  };

  // Handle resource creation
  const createResource = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true while creating resource
    try {
      const response = await api.post("/api/resources/", {
        title,
        content,
        resource_type: resourceType,
        category_ids: selectedCategories,
        tag_ids: selectedTags,
      });
      if (response.status === 201) {
        alert("Resource created");
        setTitle(""); // Reset title input
        setContent(""); // Reset content input
        setSelectedCategories([]); // Reset selected categories
        setSelectedTags([]); // Reset selected tags
        getResources(); // Refresh resource list
      } else {
        alert("Failed to create resource");
      }
    } catch (err) {
      alert("Error creating resource: " + err.message);
    } finally {
      setLoading(false); // Set loading state to false after creating
    }
  };

  // Handle resource deletion
  const deleteResource = async (id) => {
    setLoading(true); // Set loading state to true while deleting resource
    try {
      const response = await api.delete(`/api/resources/delete/${id}/`);
      if (response.status === 204) {
        alert("Resource deleted");
        getResources(); // Refresh resource list
      } else {
        alert("Failed to delete resource");
      }
    } catch (err) {
      alert("Error deleting resource: " + err.message);
    } finally {
      setLoading(false); // Set loading state to false after deletion
    }
  };

  // Display loading indicator while data is being fetched
  if (loading) return <LoadingIndicator />;

  return (
    <div className="Your-resources-page">
      <h1 className="your-resources-heading">Create a Resource</h1>
      <form onSubmit={(e) => createResource(e)} id="resource-form">
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter Title"
        />
        <div className="selections">
          <SingleSelectDropdown
            items={[
              { id: "post", name: "Post" },
              { id: "article", name: "Article" },
            ]}
            selectedItem={resourceType}
            onSelectItem={(id) => setResourceType(id)}
            placeholder="Select resource type"
            onClick={(e) => e.stopPropagation()} 
          />
          <br />
          <MultiSelectDropdown
            items={categories}
            selectedItems={selectedCategories}
            onSelectItem={(id) => {
              setSelectedCategories((prevSelected) =>
                prevSelected.includes(id)
                  ? prevSelected.filter((catId) => catId !== id)
                  : [...prevSelected, id]
              );
            }}
            placeholder="Select categories"
            onClick={(e) => e.stopPropagation()} // Ensure dropdown clicks don't trigger form submission
          />
          <br />
          <MultiSelectDropdown
            items={tags}
            selectedItems={selectedTags}
            onSelectItem={(id) => {
              setSelectedTags((prevSelected) =>
                prevSelected.includes(id)
                  ? prevSelected.filter((tagId) => tagId !== id)
                  : [...prevSelected, id]
              );
            }}
            placeholder="Select tags"
            onClick={(e) => e.stopPropagation()} // Ensure dropdown clicks don't trigger form submission
          />
        </div>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Start typing something!"
        ></textarea>
        <input
          type="submit"
          name="submit-resource"
          id="submit-resource"
          value="Post!"
        />
      </form>
      <div>
        <h1 className="your-resources-heading">Your Resources</h1>
        {resources.length > 0 ? (
          resources
            .slice()
            .reverse()
            .map((resource) => (
              <Resource
                resource={resource}
                onDelete={deleteResource}
                resourceGallery
                key={resource.id}
              />
            ))
        ) : (
          <p>No resources found. Consider adding some!</p>
        )}
      </div>
    </div>
  );
}

export default YourResources;
