import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import Resource from "../../components/Resource";
import LoadingIndicator from "../../components/LoadingIndicator";

function ResourceDetailPage() {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await api.get(`/api/resources/${slug}/`);
        setResource(response.data);
      } catch (error) {
        console.error("Failed to fetch resource:", error);
        alert("Failed to fetch resource.");
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [slug]);

  if (loading) return <LoadingIndicator />;

  return (
    <div
      className="resource-detail-page"
      style={{ padding: "15px", display: "flex", justifyContent: "center" }}
    >
      {resource ? (
        <Resource
          resource={resource}
          onDelete={() => {}}
          hideDeleteButton
          fullWidth={true} // Pass fullWidth prop as true
        />
      ) : (
        <p>Resource not found.</p>
      )}
    </div>
  );
}

export default ResourceDetailPage;
